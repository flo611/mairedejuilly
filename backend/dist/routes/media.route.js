"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const media_service_1 = require("../services/media.service");
const router = express_1.default.Router();
// Configurez Multer pour gérer le téléchargement de fichiers
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Répertoire de destination
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Nom du fichier original
    }
});
const upload = (0, multer_1.default)({ storage });
// Configuration de CORS
router.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
    methods: ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true,
}));
router.options('*', (0, cors_1.default)());
// Route pour récupérer tous les fichiers
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield (0, media_service_1.getFiles)();
        res.status(200).json(files);
    }
    catch (error) {
        console.error('Error fetching files:', error instanceof Error ? error.message : error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error. Please try again later.',
            details: error instanceof Error ? error.message : 'An unknown error occurred.',
        });
    }
}));
// Route pour l'upload de fichiers
router.post('/upload', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérification si un fichier a été uploadé
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Récupérer la catégorie depuis le corps de la requête (si applicable)
        const categorie = req.body.categorie || 'Uncategorized'; // Par défaut : 'Uncategorized'
        // Utilisation de la fonction uploadFile pour sauvegarder le fichier dans la base de données
        const fileData = yield (0, media_service_1.uploadFile)(req.file, categorie);
        // Répondre avec succès
        res.status(201).json({
            message: 'File uploaded successfully',
            file: fileData,
        });
    }
    catch (error) {
        // Gestion de l'erreur 500
        if (error instanceof Error) {
            console.error('Error:', error.message); // Loguer l'erreur pour diagnostic
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error. Please try again later.',
                details: error.message, // Ne pas exposer cela en production
            });
        }
        else {
            // Gestion des erreurs inconnues
            res.status(500).json({
                status: 'error',
                message: 'An unknown error occurred. Please try again later.',
            });
        }
    }
}));
// Route pour mettre à jour un fichier par ID
router.put('/:id', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Vérifier si un fichier a été uploadé
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Récupérer la catégorie depuis le corps de la requête (si applicable)
        const categorie = req.body.categorie || 'Uncategorized'; // Par défaut : 'Uncategorized'
        // Utilisation de la fonction updateFile pour mettre à jour le fichier
        const updatedFile = yield (0, media_service_1.updateFile)(parseInt(id), req.file, categorie);
        // Répondre avec succès
        res.status(200).json({
            message: 'File updated successfully',
            file: updatedFile,
        });
    }
    catch (error) {
        console.error('Error updating file:', error instanceof Error ? error.message : error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error. Please try again later.',
            details: error instanceof Error ? error.message : 'An unknown error occurred.',
        });
    }
}));
// Route pour supprimer un fichier par ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedFile = yield (0, media_service_1.deleteFile)(parseInt(id));
        res.status(200).json({
            message: 'File deleted successfully',
            file: deletedFile,
        });
    }
    catch (error) {
        console.error('Error deleting file:', error instanceof Error ? error.message : error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error. Please try again later.',
            details: error instanceof Error ? error.message : 'An unknown error occurred.',
        });
    }
}));
// Exporter le routeur
exports.default = router;

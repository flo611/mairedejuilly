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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileController = exports.getFileByIdController = exports.getFilesController = exports.uploadFileController = void 0;
const media_service_1 = require("../services/media.service");
// Controller pour uploader un fichier
const uploadFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier téléchargé.' });
        }
        const { categorie } = req.body;
        if (!categorie) {
            return res.status(400).json({ error: 'La catégorie est requise.' });
        }
        // On passe à la fois le fichier et la catégorie à uploadFile
        const file = yield (0, media_service_1.uploadFile)(req.file, categorie);
        res.status(201).json(file);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Une erreur inconnue est survenue.' });
    }
});
exports.uploadFileController = uploadFileController;
// Controller pour récupérer tous les fichiers
const getFilesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield (0, media_service_1.getFiles)();
        res.status(200).json(files);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
        }
    }
});
exports.getFilesController = getFilesController;
// Controller pour récupérer un fichier par ID
const getFileByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = yield (0, media_service_1.getFileById)(parseInt(req.params.id, 10));
        res.status(200).json(file);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
        }
    }
});
exports.getFileByIdController = getFileByIdController;
// Controller pour supprimer un fichier
const deleteFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, media_service_1.deleteFile)(parseInt(req.params.id, 10));
        res.status(204).end();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
        }
    }
});
exports.deleteFileController = deleteFileController;

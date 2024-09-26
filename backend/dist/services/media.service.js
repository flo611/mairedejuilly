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
exports.deleteFile = exports.getFileById = exports.getFiles = exports.updateFile = exports.uploadFile = void 0;
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
// Fonction pour uploader un fichier avec catégorie
const uploadFile = (file, categorie) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérification de la validité des données
        if (!file) {
            throw new Error("Aucun fichier n'a été téléchargé.");
        }
        if (!categorie) {
            throw new Error("Aucune catégorie n'a été spécifiée.");
        }
        // Crée une entrée dans la base de données pour le fichier
        return yield prisma.file.create({
            data: {
                filename: file.originalname,
                path: file.path, // Vérifiez que Multer enregistre bien le fichier ici
                mimetype: file.mimetype,
                size: file.size,
                categorie, // Ajoute la catégorie ici
            },
        });
    }
    catch (error) {
        throw new Error(`Erreur lors du téléchargement du fichier : ${error.message || "Erreur inconnue"}`);
    }
});
exports.uploadFile = uploadFile;
// Fonction pour mettre à jour un fichier
const updateFile = (id, file, categorie) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingFile = yield prisma.file.findUnique({ where: { id } });
        if (!existingFile) {
            throw new Error(`Fichier avec l'ID ${id} introuvable.`);
        }
        // Supprime l'ancien fichier du système de fichiers si un nouveau fichier est téléchargé
        if (file) {
            const oldFilePath = path_1.default.resolve(existingFile.path);
            if (fs_1.default.existsSync(oldFilePath)) {
                fs_1.default.unlinkSync(oldFilePath);
            }
            // Mettez à jour le fichier avec les nouvelles données
            return yield prisma.file.update({
                where: { id },
                data: {
                    filename: file.originalname,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                    categorie: categorie || existingFile.categorie, // Si la nouvelle catégorie n'est pas fournie, conserver l'ancienne
                },
            });
        }
        else {
            // Si aucun nouveau fichier n'est fourni, vous pouvez uniquement mettre à jour la catégorie
            return yield prisma.file.update({
                where: { id },
                data: {
                    categorie: categorie || existingFile.categorie,
                },
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erreur lors de la mise à jour du fichier avec l'ID ${id} : ${error.message}`);
        }
        else {
            throw new Error("Erreur inconnue lors de la mise à jour du fichier.");
        }
    }
});
exports.updateFile = updateFile;
// Fonction pour récupérer tous les fichiers
const getFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.file.findMany();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Erreur lors de la récupération des fichiers : ${error.message}`);
            throw new Error(`Erreur lors de la récupération des fichiers : ${error.message}`);
        }
        else {
            throw new Error("Erreur inconnue lors de la récupération des fichiers.");
        }
    }
});
exports.getFiles = getFiles;
// Fonction pour récupérer un fichier par ID
const getFileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = yield prisma.file.findUnique({
            where: { id },
        });
        if (!file) {
            throw new Error(`Fichier avec l'ID ${id} introuvable.`);
        }
        return file;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erreur lors de la récupération du fichier avec l'ID ${id} : ${error.message}`);
        }
        else {
            throw new Error("Erreur inconnue lors de la récupération du fichier.");
        }
    }
});
exports.getFileById = getFileById;
// Fonction pour supprimer un fichier par ID
const deleteFile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = yield prisma.file.findUnique({ where: { id } });
        if (!file) {
            throw new Error(`Fichier avec l'ID ${id} introuvable.`);
        }
        // Supprime le fichier du système de fichiers
        const filePath = path_1.default.resolve(file.path);
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath); // Supprime le fichier du système de fichiers
        }
        else {
            throw new Error(`Le fichier à l'emplacement ${filePath} n'existe pas.`);
        }
        // Supprime l'entrée dans la base de données
        return yield prisma.file.delete({
            where: { id },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erreur lors de la suppression du fichier avec l'ID ${id} : ${error.message}`);
        }
        else {
            throw new Error("Erreur inconnue lors de la suppression du fichier.");
        }
    }
});
exports.deleteFile = deleteFile;

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
exports.deleteArticle = exports.updateArticle = exports.getArticleById = exports.getArticles = exports.createArticle = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
const prisma = new client_1.PrismaClient();
// Schéma de validation pour les articles
const articleSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(255).required(),
    content: joi_1.default.string().min(10).required(),
    categorie: joi_1.default.string().min(3).max(50).required(),
});
// Fonction pour créer un article
const createArticle = (title, content, categorie) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation des données avec Joi
    const { error } = articleSchema.validate({ title, content, categorie });
    if (error)
        throw new Error(error.details[0].message);
    try {
        return yield prisma.article.create({
            data: { title, content, categorie },
        });
    }
    catch (error) {
        console.error('Error creating article:', error);
        throw new Error('Could not create article');
    }
});
exports.createArticle = createArticle;
// Fonction pour récupérer tous les articles
const getArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.article.findMany();
    }
    catch (error) {
        console.error('Error retrieving articles:', error);
        throw new Error('Could not retrieve articles');
    }
});
exports.getArticles = getArticles;
// Fonction pour récupérer un article par son ID
const getArticleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation de l'ID
    if (id <= 0)
        throw new Error('Invalid ID');
    try {
        const article = yield prisma.article.findUnique({
            where: { id },
        });
        if (!article) {
            throw new Error('Article not found');
        }
        return article;
    }
    catch (error) {
        console.error('Error retrieving article by ID:', error);
        throw new Error('Could not retrieve article');
    }
});
exports.getArticleById = getArticleById;
// Fonction pour mettre à jour un article
const updateArticle = (id, title, content, categorie) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation de l'ID
    if (id <= 0)
        throw new Error('Invalid ID');
    // Validation des données avec Joi
    const { error } = articleSchema.validate({ title, content, categorie });
    if (error)
        throw new Error(error.details[0].message);
    try {
        return yield prisma.article.update({
            where: { id },
            data: { title, content, categorie },
        });
    }
    catch (error) {
        console.error('Error updating article:', error);
        throw new Error('Could not update article');
    }
});
exports.updateArticle = updateArticle;
// Fonction pour supprimer un article
const deleteArticle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation de l'ID
    if (id <= 0)
        throw new Error('Invalid ID');
    try {
        return yield prisma.article.delete({
            where: { id },
        });
    }
    catch (error) {
        console.error('Error deleting article:', error);
        throw new Error('Could not delete article');
    }
});
exports.deleteArticle = deleteArticle;

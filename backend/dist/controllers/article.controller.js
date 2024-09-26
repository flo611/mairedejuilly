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
exports.deleteArticleController = exports.updateArticleController = exports.getArticleByIdController = exports.getArticlesController = exports.createArticleController = void 0;
const article_service_1 = require("../services/article.service");
// Controller pour créer un article
const createArticleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, categorie } = req.body;
    try {
        const article = yield (0, article_service_1.createArticle)(title, content, categorie);
        res.status(201).json(article);
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
exports.createArticleController = createArticleController;
// Controller pour récupérer tous les articles
const getArticlesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield (0, article_service_1.getArticles)();
        res.status(200).json(articles);
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
exports.getArticlesController = getArticlesController;
// Controller pour récupérer un article par ID
const getArticleByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield (0, article_service_1.getArticleById)(parseInt(req.params.id, 10));
        res.status(200).json(article);
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
exports.getArticleByIdController = getArticleByIdController;
// Controller pour mettre à jour un article
const updateArticleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, categorie } = req.body;
    try {
        const article = yield (0, article_service_1.updateArticle)(parseInt(req.params.id, 10), title, content, categorie);
        res.status(200).json(article);
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
exports.updateArticleController = updateArticleController;
// Controller pour supprimer un article
const deleteArticleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, article_service_1.deleteArticle)(parseInt(req.params.id, 10));
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
exports.deleteArticleController = deleteArticleController;

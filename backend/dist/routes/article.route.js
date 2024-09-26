"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const article_controller_1 = require("../controllers/article.controller");
const router = express_1.default.Router();
router.use((0, cors_1.default)({
    origin: process.env.ORIGIN, // Ajuste l'origine si nécessaire
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
router.options('*', (0, cors_1.default)());
// Pas besoin de `/articles` ici car c'est déjà défini dans `server.ts`
router.post('/', article_controller_1.createArticleController);
router.get('/', article_controller_1.getArticlesController);
router.get('/:id', article_controller_1.getArticleByIdController);
router.put('/:id', article_controller_1.updateArticleController);
router.delete('/:id', article_controller_1.deleteArticleController);
exports.default = router;

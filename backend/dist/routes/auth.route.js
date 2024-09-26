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
// auth.route.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_service_1 = require("../services/auth.service");
const router = express_1.default.Router();
// Configurer CORS pour l'ensemble des routes d'authentification
router.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
    methods: ['POST', 'GET', 'OPTIONS'], // Autoriser les méthodes spécifiques
    credentials: true, // Autoriser l'envoi des cookies/credentials si nécessaire
}));
// Répondre à la requête pré-vol OPTIONS (préflight)
router.options('*', (0, cors_1.default)());
// Endpoint pour la connexion
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield (0, auth_service_1.loginUser)(email, password);
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}));
exports.default = router;

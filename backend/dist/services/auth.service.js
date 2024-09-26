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
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
// Regex pour valider l'email et le mot de passe
const validateEmail = (email) => {
    // Validation d'un email standard
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const validatePassword = (password) => {
    // Minimum 8 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
};
// Fonction pour l'inscription d'un utilisateur
const registerUser = (email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation de l'email et du mot de passe avec les regex
    if (!validateEmail(email)) {
        throw new Error('Email invalide');
    }
    if (!validatePassword(password)) {
        throw new Error('Le mot de passe doit comporter au moins 8 caractères, avec des lettres majuscules et minuscules, un chiffre et un caractère spécial');
    }
    // Hashage du mot de passe
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Création de l'utilisateur dans la base de données
    const user = yield prisma.user.create({
        data: { email, password: hashedPassword, role },
    });
    return user;
});
exports.registerUser = registerUser;
// Fonction pour la connexion d'un utilisateur
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validation de l'email avant de procéder
        if (!validateEmail(email)) {
            throw new Error('Email invalide');
        }
        // Trouver l'utilisateur par email dans la base de données
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        // Comparer le mot de passe hashé
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw new Error('Mot de passe incorrect');
        }
        // Générer un token JWT sécurisé
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, // Inclure le rôle dans le token
        process.env.JWT_SECRET || 'votre_clé_secrète', // Utiliser une variable d'environnement pour la clé secrète
        { expiresIn: '1h' } // Expiration du token dans 1h
        );
        return token;
    }
    catch (error) {
        throw error;
    }
});
exports.loginUser = loginUser;

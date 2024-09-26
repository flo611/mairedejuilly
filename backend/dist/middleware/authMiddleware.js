"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    // Log de l'objet Request initial
    console.log('Requête initiale:', req.headers);
    const token = req.headers['authorization'];
    if (!token) {
        console.log('Token manquant');
        return res.status(401).json({ message: 'Token manquant' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'votre_clé_secrète', (err, decoded) => {
        if (err) {
            console.log('Erreur de vérification du token:', err.message);
            return res.status(401).json({ message: 'Token invalide' });
        }
        // Log du contenu décodé du token
        console.log('Token décodé:', decoded);
        // Ajout des informations utilisateur à la requête
        req.user = {
            userId: decoded.userId, // Cast pour éviter l'erreur de type
            role: decoded.role,
        };
        // Log après ajout des informations utilisateur
        console.log('Objet Request après ajout des informations utilisateur:', req);
        next();
    });
};
exports.authMiddleware = authMiddleware;

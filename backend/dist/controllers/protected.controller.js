"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someProtectedController = void 0;
const someProtectedController = (req, res) => {
    // Ici, req.user est maintenant reconnu comme valide
    const user = req.user; // Récupère les informations d'utilisateur du token
    res.status(200).json({ message: 'Accès autorisé à la route protégée', user });
};
exports.someProtectedController = someProtectedController;

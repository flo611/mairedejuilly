"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware"); // Assure-toi que le chemin est correct
const protected_controller_1 = require("../controllers/protected.controller");
const router = (0, express_1.Router)();
// Utilise le middleware d'authentification pour les routes protégées
router.get('/protected', authMiddleware_1.authMiddleware, protected_controller_1.someProtectedController);
exports.default = router;

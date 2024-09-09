import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware'; // Assure-toi que le chemin est correct
import { someProtectedController } from '../controllers/protected.controller';

const router = Router();

// Utilise le middleware d'authentification pour les routes protégées
router.get('/protected', authMiddleware, someProtectedController);

export default router;

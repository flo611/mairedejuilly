// auth.route.ts
import express from 'express';
import cors from 'cors';
import { loginUser } from '../services/auth.service';

const router = express.Router();

// Configurer CORS pour l'ensemble des routes d'authentification
router.use(cors({
  origin: process.env.ORIGIN,
  methods: ['POST', 'GET', 'OPTIONS'], // Autoriser les méthodes spécifiques
  credentials: true, // Autoriser l'envoi des cookies/credentials si nécessaire
}));

// Répondre à la requête pré-vol OPTIONS (préflight)
router.options('*', cors());

// Endpoint pour la connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;

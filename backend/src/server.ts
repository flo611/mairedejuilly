import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route'; // Route pour l'authentification
import articleRouter from './routes/article.route'; // Route pour les articles
import mediaRouter from './routes/media.route'; // Route pour les médias
import protectedRouter from './routes/protected.route'; // Route protégée (si nécessaire)

const app = express();

// Appliquer CORS globalement à toutes les routes
app.use(cors({
  origin: process.env.ORIGIN, // Autorisez l'origine de votre front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autoriser les méthodes HTTP
  credentials: true, // Si vous utilisez des cookies ou des tokens dans les en-têtes Authorization
}));

app.use(express.json()); // Middleware JSON pour parsing

// Routes
app.use('/auth', authRouter); // Routes pour l'authentification
app.use('/api/articles', articleRouter); // Routes pour les articles
app.use('/api/media', mediaRouter); // Routes pour les médias

// Si tu as des routes protégées qui nécessitent une authentification, tu peux les ajouter ici
app.use('/api/protected', protectedRouter);

const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

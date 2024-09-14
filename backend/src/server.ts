import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route'; // Route pour l'authentification
import protectedRouter from './routes/protected.route'; // Route protégée

const app = express();

// Appliquer CORS globalement à toutes les routes
app.use(cors({
  origin: 'http://localhost:3000', // Autorisez l'origine de votre front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autoriser les méthodes HTTP
  credentials: true, // Si vous utilisez des cookies ou des tokens dans les en-têtes Authorization
}));

app.use(express.json()); // Middleware JSON pour parsing

// Routes
app.use('/auth', authRouter);
app.use('/api', protectedRouter); // Expose les routes protégées

const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

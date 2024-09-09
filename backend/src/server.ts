import express from 'express';
import authRouter from './routes/auth.route'; // Route pour l'authentification
import protectedRouter from './routes/protected.route'; // Route protégée

const app = express();

app.use(express.json()); // Middleware JSON pour parsing

// Routes
app.use('/auth', authRouter);
app.use('/api', protectedRouter); // Expose les routes protégées

const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

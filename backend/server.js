const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour le traitement du JSON
app.use(express.json());

// Importer les routes
const authRoutes = require('./routes/auth.routes');
const articleRoutes = require('./routes/article.routes');

// Utiliser les routes avec les préfixes appropriés
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes); // Assure-toi que le préfixe est correct

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

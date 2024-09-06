const express = require('express');
const router = express.Router();
const { createArticle, getAllArticles } = require('../controllers/articles.controller');
const roleMiddleware = require('../middleware/roleMiddleware');

// Route pour créer un article (exige d'être connecté et avoir le rôle approprié)
router.post('/articles', roleMiddleware('ADMIN'), createArticle);

// Route pour récupérer tous les articles
router.get('/articles', getAllArticles);

module.exports = router;

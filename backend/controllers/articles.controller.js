const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createArticle = async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user.id; // Assumes you have a way to get the logged-in user

  try {
    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        authorId, // L'auteur est l'utilisateur connecté
      },
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
  }
};

module.exports = { createArticle, getAllArticles };

import express from 'express';
import cors from 'cors';
import { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } from '../services/article.service';

const router = express.Router();

router.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

router.options('*', cors());

router.post('/articles', async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await createArticle(title, content);
    res.status(201).json(article);
  }catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
});

router.get('/articles', async (req, res) => {
  try {
    const articles = await getArticles();
    res.status(200).json(articles);
  }catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
  
});

router.get('/articles/:id', async (req, res) => {
  try {
    const article = await getArticleById(parseInt(req.params.id, 10));
    res.status(200).json(article);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
  
});

router.put('/articles/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await updateArticle(parseInt(req.params.id, 10), title, content);
    res.status(200).json(article);
  }catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
  
});

router.delete('/articles/:id', async (req, res) => {
  try {
    await deleteArticle(parseInt(req.params.id, 10));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
  
});

export default router;

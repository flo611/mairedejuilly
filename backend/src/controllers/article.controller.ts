import { Request, Response } from 'express';
import { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } from '../services/article.service';

// Controller pour créer un article
export const createArticleController = async (req: Request, res: Response) => {
  const { title, content, categorie } = req.body;
  try {
    const article = await createArticle(title, content, categorie);
    res.status(201).json(article);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
};

// Controller pour récupérer tous les articles
export const getArticlesController = async (req: Request, res: Response) => {
  try {
    const articles = await getArticles();
    res.status(200).json(articles);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
};

// Controller pour récupérer un article par ID
export const getArticleByIdController = async (req: Request, res: Response) => {
  try {
    const article = await getArticleById(parseInt(req.params.id, 10));
    res.status(200).json(article);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
};

// Controller pour mettre à jour un article
export const updateArticleController = async (req: Request, res: Response) => {
  const { title, content, categorie } = req.body;
  try {
    const article = await updateArticle(parseInt(req.params.id, 10), title, content, categorie);
    res.status(200).json(article);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
};

// Controller pour supprimer un article
export const deleteArticleController = async (req: Request, res: Response) => {
  try {
    await deleteArticle(parseInt(req.params.id, 10));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
};

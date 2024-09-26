import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

const prisma = new PrismaClient();

// Schéma de validation pour les articles
const articleSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().min(10).required(),
  categorie: Joi.string().min(3).max(50).required(),
});

// Fonction pour créer un article
export const createArticle = async (title: string, content: string, categorie: string) => {
  // Validation des données avec Joi
  const { error } = articleSchema.validate({ title, content, categorie });
  if (error) throw new Error(error.details[0].message);

  try {
    return await prisma.article.create({
      data: { title, content, categorie },
    });
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Could not create article');
  }
};

// Fonction pour récupérer tous les articles
export const getArticles = async () => {
  try {
    return await prisma.article.findMany();
  } catch (error) {
    console.error('Error retrieving articles:', error);
    throw new Error('Could not retrieve articles');
  }
};

// Fonction pour récupérer un article par son ID
export const getArticleById = async (id: number) => {
  // Validation de l'ID
  if (id <= 0) throw new Error('Invalid ID');

  try {
    const article = await prisma.article.findUnique({
      where: { id },
    });
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  } catch (error) {
    console.error('Error retrieving article by ID:', error);
    throw new Error('Could not retrieve article');
  }
};

// Fonction pour mettre à jour un article
export const updateArticle = async (id: number, title: string, content: string, categorie: string) => {
  // Validation de l'ID
  if (id <= 0) throw new Error('Invalid ID');

  // Validation des données avec Joi
  const { error } = articleSchema.validate({ title, content, categorie });
  if (error) throw new Error(error.details[0].message);

  try {
    return await prisma.article.update({
      where: { id },
      data: { title, content, categorie },
    });
  } catch (error) {
    console.error('Error updating article:', error);
    throw new Error('Could not update article');
  }
};

// Fonction pour supprimer un article
export const deleteArticle = async (id: number) => {
  // Validation de l'ID
  if (id <= 0) throw new Error('Invalid ID');

  try {
    return await prisma.article.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    throw new Error('Could not delete article');
  }
};

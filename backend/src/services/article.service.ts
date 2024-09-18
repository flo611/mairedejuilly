import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createArticle = async (title: string, content: string, categorie: string) => {
  return prisma.article.create({
    data: { title, content, categorie },
  });
};

export const getArticles = async () => {
  return prisma.article.findMany();
};

export const getArticleById = async (id: number) => {
  return prisma.article.findUnique({
    where: { id },
  });
};

export const updateArticle = async (id: number, title: string, content: string, categorie: string) => {
  return prisma.article.update({
    where: { id },
    data: { title, content, categorie },
  });
};

export const deleteArticle = async (id: number) => {
  return prisma.article.delete({
    where: { id },
  });
};

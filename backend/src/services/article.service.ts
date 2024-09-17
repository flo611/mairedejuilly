import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createArticle = async (title: string, content: string) => {
  return prisma.Article.create({
    data: { title, content },
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

export const updateArticle = async (id: number, title: string, content: string) => {
  return prisma.article.update({
    where: { id },
    data: { title, content },
  });
};

export const deleteArticle = async (id: number) => {
  return prisma.article.delete({
    where: { id },
  });
};

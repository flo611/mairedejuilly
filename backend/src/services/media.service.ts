import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { Express } from 'express';

const prisma = new PrismaClient();

// Fonction pour uploader un fichier avec catégorie
export const uploadFile = async (file: Express.Multer.File, categorie: string) => {
  try {
    if (!file) {
      throw new Error("Aucun fichier n'a été téléchargé.");
    }

    if (!categorie) {
      throw new Error("Aucune catégorie n'a été spécifiée.");
    }

    // Crée une entrée dans la base de données pour le fichier
    return await prisma.file.create({
      data: {
        filename: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
        categorie,  // Ajoute la catégorie ici
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors du téléchargement du fichier : ${error.message}`);
    } else {
      throw new Error("Erreur inconnue lors du téléchargement du fichier.");
    }
  }
};

// Fonction pour récupérer tous les fichiers
export const getFiles = async () => {
  try {
    return await prisma.file.findMany();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erreur lors de la récupération des fichiers : ${error.message}`);
      throw new Error(`Erreur lors de la récupération des fichiers : ${error.message}`);
    } else {
      throw new Error("Erreur inconnue lors de la récupération des fichiers.");
    }
  }
};

// Fonction pour récupérer un fichier par ID
export const getFileById = async (id: number) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new Error(`Fichier avec l'ID ${id} introuvable.`);
    }

    return file;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors de la récupération du fichier avec l'ID ${id} : ${error.message}`);
    } else {
      throw new Error("Erreur inconnue lors de la récupération du fichier.");
    }
  }
};

// Fonction pour supprimer un fichier par ID
export const deleteFile = async (id: number) => {
  try {
    const file = await prisma.file.findUnique({ where: { id } });

    if (!file) {
      throw new Error(`Fichier avec l'ID ${id} introuvable.`);
    }

    // Supprime le fichier du système de fichiers
    const filePath = path.resolve(file.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Supprime le fichier du système de fichiers
    } else {
      throw new Error(`Le fichier à l'emplacement ${filePath} n'existe pas.`);
    }

    // Supprime l'entrée dans la base de données
    return await prisma.file.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors de la suppression du fichier avec l'ID ${id} : ${error.message}`);
    } else {
      throw new Error("Erreur inconnue lors de la suppression du fichier.");
    }
  }
};

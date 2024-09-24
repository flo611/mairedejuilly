import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { Express } from 'express';

const prisma = new PrismaClient();

// Fonction pour uploader un fichier avec catégorie
export const uploadFile = async (file: Express.Multer.File, categorie: string) => {
  try {
    // Vérification de la validité des données
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
        path: file.path, // Vérifiez que Multer enregistre bien le fichier ici
        mimetype: file.mimetype,
        size: file.size,
        categorie,  // Ajoute la catégorie ici
      },
    });
  } catch (error: any) {
    throw new Error(`Erreur lors du téléchargement du fichier : ${error.message || "Erreur inconnue"}`);
  }
};

// Fonction pour mettre à jour un fichier
export const updateFile = async (id: number, file?: Express.Multer.File, categorie?: string) => {
  try {
    const existingFile = await prisma.file.findUnique({ where: { id } });

    if (!existingFile) {
      throw new Error(`Fichier avec l'ID ${id} introuvable.`);
    }

    // Supprime l'ancien fichier du système de fichiers si un nouveau fichier est téléchargé
    if (file) {
      const oldFilePath = path.resolve(existingFile.path);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      // Mettez à jour le fichier avec les nouvelles données
      return await prisma.file.update({
        where: { id },
        data: {
          filename: file.originalname,
          path: file.path,
          mimetype: file.mimetype,
          size: file.size,
          categorie: categorie || existingFile.categorie,  // Si la nouvelle catégorie n'est pas fournie, conserver l'ancienne
        },
      });
    } else {
      // Si aucun nouveau fichier n'est fourni, vous pouvez uniquement mettre à jour la catégorie
      return await prisma.file.update({
        where: { id },
        data: {
          categorie: categorie || existingFile.categorie,
        },
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors de la mise à jour du fichier avec l'ID ${id} : ${error.message}`);
    } else {
      throw new Error("Erreur inconnue lors de la mise à jour du fichier.");
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

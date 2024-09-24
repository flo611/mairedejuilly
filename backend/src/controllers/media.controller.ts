import { Request, Response } from 'express';
import { uploadFile, getFiles, getFileById, deleteFile } from '../services/media.service';

// Controller pour uploader un fichier
export const uploadFileController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier téléchargé.' });
    }

    const { categorie } = req.body;

    if (!categorie) {
      return res.status(400).json({ error: 'La catégorie est requise.' });
    }

    // On passe à la fois le fichier et la catégorie à uploadFile
    const file = await uploadFile(req.file, categorie);
    res.status(201).json(file);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Une erreur inconnue est survenue.' });
  }
};

// Controller pour récupérer tous les fichiers
export const getFilesController = async (req: Request, res: Response) => {
  try {
    const files = await getFiles();
    res.status(200).json(files);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
};

// Controller pour récupérer un fichier par ID
export const getFileByIdController = async (req: Request, res: Response) => {
  try {
    const file = await getFileById(parseInt(req.params.id, 10));
    res.status(200).json(file);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
};

// Controller pour supprimer un fichier
export const deleteFileController = async (req: Request, res: Response) => {
  try {
    await deleteFile(parseInt(req.params.id, 10));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
};

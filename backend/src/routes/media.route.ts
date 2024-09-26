import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { uploadFile, getFiles, getFileById, deleteFile, updateFile } from '../services/media.service';

const router = express.Router();

// Configurez Multer pour gérer le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire de destination
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nom du fichier original
  }
});

const upload = multer({ storage });

// Configuration de CORS
router.use(cors({
  origin: process.env.ORIGIN,
  methods: ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'],
  credentials: true,
}));

router.options('*', cors());

// Route pour récupérer tous les fichiers
router.get('/', async (req, res) => {
  try {
    const files = await getFiles(); 
    res.status(200).json(files); 
  } catch (error) {
    console.error('Error fetching files:', error instanceof Error ? error.message : error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error. Please try again later.',
      details: error instanceof Error ? error.message : 'An unknown error occurred.',
    });
  }
});

// Route pour l'upload de fichiers
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Vérification si un fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Récupérer la catégorie depuis le corps de la requête (si applicable)
    const categorie = req.body.categorie || 'Uncategorized';  // Par défaut : 'Uncategorized'

    // Utilisation de la fonction uploadFile pour sauvegarder le fichier dans la base de données
    const fileData = await uploadFile(req.file, categorie);

    // Répondre avec succès
    res.status(201).json({
      message: 'File uploaded successfully',
      file: fileData,
    });
  } catch (error) {
    // Gestion de l'erreur 500
    if (error instanceof Error) {
      console.error('Error:', error.message); // Loguer l'erreur pour diagnostic
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error. Please try again later.',
        details: error.message, // Ne pas exposer cela en production
      });
    } else {
      // Gestion des erreurs inconnues
      res.status(500).json({
        status: 'error',
        message: 'An unknown error occurred. Please try again later.',
      });
    }
  }
});

// Route pour mettre à jour un fichier par ID
router.put('/:id', upload.single('file'), async (req, res) => {
  const { id } = req.params;

  try {
    // Vérifier si un fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Récupérer la catégorie depuis le corps de la requête (si applicable)
    const categorie = req.body.categorie || 'Uncategorized'; // Par défaut : 'Uncategorized'

    // Utilisation de la fonction updateFile pour mettre à jour le fichier
    const updatedFile = await updateFile(parseInt(id), req.file, categorie);

    // Répondre avec succès
    res.status(200).json({
      message: 'File updated successfully',
      file: updatedFile,
    });
  } catch (error) {
    console.error('Error updating file:', error instanceof Error ? error.message : error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error. Please try again later.',
      details: error instanceof Error ? error.message : 'An unknown error occurred.',
    });
  }
});

// Route pour supprimer un fichier par ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params; 
  try {
    const deletedFile = await deleteFile(parseInt(id)); 
    res.status(200).json({
      message: 'File deleted successfully',
      file: deletedFile,
    });
  } catch (error) {
    console.error('Error deleting file:', error instanceof Error ? error.message : error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error. Please try again later.',
      details: error instanceof Error ? error.message : 'An unknown error occurred.',
    });
  }
});

// Exporter le routeur
export default router;

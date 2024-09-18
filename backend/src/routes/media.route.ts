import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { uploadFile, getFiles, getFileById, deleteFile } from '../services/media.service';

const router = express.Router();

// Configurez Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

router.options('*', cors());

// Route pour l'upload de fichiers
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(201).json({
    message: 'File uploaded successfully',
    file: req.file
  });
});

export default router;

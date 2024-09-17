import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { uploadFile, getFiles, getFileById, deleteFile } from '../services/media.service';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

router.options('*', cors());

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = await uploadFile(req.file);
    res.status(201).json(file);
  }catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
  
});

router.get('/files', async (req, res) => {
  try {
    const files = await getFiles();
    res.status(200).json(files);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
  
});

router.get('/files/:id', async (req, res) => {
  try {
    const file = await getFileById(parseInt(req.params.id, 10));
    res.status(200).json(file);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
  
});

router.delete('/files/:id', async (req, res) => {
  try {
    await deleteFile(parseInt(req.params.id, 10));
    res.status(204).end();
  }catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
  
});

export default router;

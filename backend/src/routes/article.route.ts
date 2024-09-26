import express from 'express';
import cors from 'cors';
import {
  createArticleController,
  getArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController
} from '../controllers/article.controller';

const router = express.Router();

router.use(cors({
  origin: process.env.ORIGIN , // Ajuste l'origine si nécessaire
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

router.options('*', cors());

// Pas besoin de `/articles` ici car c'est déjà défini dans `server.ts`
router.post('/', createArticleController);
router.get('/', getArticlesController);
router.get('/:id', getArticleByIdController);
router.put('/:id', updateArticleController);
router.delete('/:id', deleteArticleController);

export default router;

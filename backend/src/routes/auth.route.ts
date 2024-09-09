import { Router } from 'express';
import { login } from '../controllers/auth.controller';

import express from 'express';


const router = express.Router();

// Assure-toi que 'login' est importé correctement depuis auth.controller.ts
router.post('/login', login);


export default router;

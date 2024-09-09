import { Request, Response } from 'express';
import { loginUser } from '../services/auth.service';



// Contrôleur pour la connexion
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
};




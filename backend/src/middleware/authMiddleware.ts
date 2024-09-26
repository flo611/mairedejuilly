import { Request, Response, NextFunction } from 'express';

// Exemple de middleware d'authentification
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Ici, tu pourrais vérifier un token ou faire une vérification d'authentification
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  
  // Logique d'authentification ici...
  
  next();
};
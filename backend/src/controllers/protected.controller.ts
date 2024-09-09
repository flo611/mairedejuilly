import { Request, Response } from 'express';

export const someProtectedController = (req: Request, res: Response) => {
  // Exemple de réponse pour une route protégée
  res.status(200).json({ message: 'Accès autorisé à la route protégée' });
};

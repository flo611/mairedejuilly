import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();



// Fonction pour l'inscription
export const registerUser = async (email: string, password: string, role: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });
  return user;
};

// Fonction pour la connexion


export const loginUser = async (email: string, password: string): Promise<string> => {
  try {
    // Trouver l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Comparer le mot de passe
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Mot de passe incorrect');
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id }, 'votre_clé_secrète', {
      expiresIn: '1h',
    });

    return token;
  } catch (error) {
    throw error;
  }
};
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Regex pour valider l'email et le mot de passe
const validateEmail = (email: string) => {
  // Validation d'un email standard
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  // Minimum 8 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
};

// Fonction pour l'inscription d'un utilisateur
export const registerUser = async (email: string, password: string, role: string) => {
  // Validation de l'email et du mot de passe avec les regex
  if (!validateEmail(email)) {
    throw new Error('Email invalide');
  }

  if (!validatePassword(password)) {
    throw new Error('Le mot de passe doit comporter au moins 8 caractères, avec des lettres majuscules et minuscules, un chiffre et un caractère spécial');
  }

  // Hashage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création de l'utilisateur dans la base de données
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });

  return user;
};

// Fonction pour la connexion d'un utilisateur
export const loginUser = async (email: string, password: string): Promise<string> => {
  try {
    // Validation de l'email avant de procéder
    if (!validateEmail(email)) {
      throw new Error('Email invalide');
    }

    // Trouver l'utilisateur par email dans la base de données
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Comparer le mot de passe hashé
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Mot de passe incorrect');
    }

    // Générer un token JWT sécurisé
    const token = jwt.sign(
      { userId: user.id, role: user.role }, // Inclure le rôle dans le token
      process.env.JWT_SECRET || 'votre_clé_secrète', // Utiliser une variable d'environnement pour la clé secrète
      { expiresIn: '1h' } // Expiration du token dans 1h
    );

    return token;
  } catch (error) {
    throw error;
  }
};

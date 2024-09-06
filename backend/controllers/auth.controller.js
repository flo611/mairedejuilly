const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    // Génération du token JWT (optionnelle)
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
};

module.exports = { registerUser };


const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérifie si l'utilisateur existe
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }
  
      // Vérifie le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }
  
      // Génération du token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
  };
  
  module.exports = { registerUser, loginUser };
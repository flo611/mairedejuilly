const express = require('express');
const router = express.Router();

const { loginUser, registerUser } = require('../controllers/auth.controller'); // Route pour l'inscription des utilisateurs

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;

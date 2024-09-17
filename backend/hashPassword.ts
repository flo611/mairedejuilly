// hashPassword.ts
const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = 'Mairiejuilly77*'; // Nouveau mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Mot de passe haché:', hashedPassword);
}

hashPassword();

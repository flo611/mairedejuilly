"use client"
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // State pour stocker les valeurs des champs du formulaire et les erreurs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    try {
      // Envoi des données au backend
      const response = await axios.post('http://localhost:3008/auth/login', {
        email,
        password
      });

      // Traitement de la réponse
      setSuccess('Login successful!'); // Message de succès
      setError(''); // Réinitialiser les erreurs
      console.log(response.data); // Vous pouvez faire quelque chose avec les données de la réponse
    } catch (err) {
      // Traitement des erreurs
      setError('Invalid credentials'); // Message d'erreur
      setSuccess(''); // Réinitialiser le succès
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 bg-red-700 text-white p-2">Login</h1>

      {/* Afficher les messages de succès ou d'erreur */}
      {success && <div className="text-green-500">{success}</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

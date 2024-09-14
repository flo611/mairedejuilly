"use client";
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
      }, {
        withCredentials: true, // Si le backend utilise des cookies/sessions
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Traitement de la réponse en cas de succès
      setSuccess('Login successful!'); // Message de succès
      setError(''); // Réinitialiser les erreurs
      console.log(response.data); // Vous pouvez faire quelque chose avec les données de la réponse, comme stocker le token

    } catch (err) {
      // Traitement des erreurs
      if (err.response) {
        // La requête a été faite, mais le serveur a répondu avec un code de statut non compris entre 2xx
        setError(err.response.data.error || 'Login failed, please try again.');
      } else if (err.request) {
        // La requête a été faite, mais aucune réponse n'a été reçue
        setError('No response from the server. Please try again later.');
      } else {
        // Quelque chose s'est passé lors de la configuration de la requête qui a déclenché une erreur
        setError('Error during the login process.');
      }
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

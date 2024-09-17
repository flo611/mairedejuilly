"use client";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import de useNavigate
import axios from 'axios';


const Login = () => {
  // State pour stocker les valeurs des champs du formulaire et les erreurs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate(); // Initialise useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(email)) {
      setError('Email invalide');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Le mot de passe doit comporter au moins 8 caractères, avec des lettres majuscules et minuscules, un chiffre et un caractère spécial');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3008/auth/login', { email, password });
      setSuccess('Login successful!');
      setError('');

      // Utilise navigate pour rediriger vers le dashboard
      navigate('/dashboard'); // Redirige vers le chemin correct
    } catch (err) {
      setError('Invalid credentials');
      setSuccess('');
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

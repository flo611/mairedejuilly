"use client";

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

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
      const { token } = response.data;

      localStorage.setItem('token', token);
      setSuccess('Login successful!');
      setError('');

      // Rediriger vers le dashboard
      navigate('/dashboard');
    } catch (err) {
      // Affiche le message d'erreur du serveur si disponible
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      setError(errorMessage);
      setSuccess('');
      console.error(err);
    }
  };

  return (
    <div className="p-4 mt-20">
      <h1 className="text-xl font-bold mb-4 bg-red-200 text-yellow-900 p-2">Login</h1>

      {success && <div className="text-green-500">{success}</div>}
      {error && <div className="text-red-500">{error}</div>}

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
          className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

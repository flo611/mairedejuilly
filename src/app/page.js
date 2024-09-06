"use client"

import React, { useState } from 'react';

import Navbar from "./components/layouts/navbar";
import HomePage from "./home";
import Login from "./components/login";
import Dashboard from "./pages/dashboard";
export default function Home() {
 

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Callback pour changer l'état après connexion
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
    return (
      <>
        <Navbar/>
        <HomePage />
        <div>
      {isLoggedIn ? (
        // Afficher le tableau de bord si l'utilisateur est connecté
        <Dashboard />
      ) : (
        // Afficher la page de connexion si l'utilisateur n'est pas connecté
        <Login onLogin={handleLogin} />
      )}
    </div>

      </>
      
    );
  }
"use client";
import React from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import Dashboard from "../../app/pages/dashboard";
import HomePage from "../../app/home";
import Navbar from "../../app/components/layouts/navbar/index";
import Login from "../../app/pages/login";

// Définir les routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> {/* Navbar toujours visible */}
        <Outlet />  {/* Affiche les pages en fonction des routes */}
      </>
    ),
    children: [
      {
        path: "/", 
        element: <HomePage />, // Page d'accueil
      },
      {
        path: "login", 
        element: <Login />, // Page de connexion
      },
      {
        path: "dashboard", 
        element: <Dashboard />, // Tableau de bord
      },
      {
        path: "*", 
        element: <Navigate to="/" replace /> // Redirection vers la page d'accueil pour les routes inconnues
      }
    ],
  },
]);

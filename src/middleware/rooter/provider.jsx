"use client";
import React from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";

import Navbar from "../../app/components/layouts/navbar/index";
import HomePage from "../../app/home";
import Urbanisme from "../../app/pages/urbanisme/index"

import Dashboard from "../../app/pages/dashboard";
import Login from "../../app/pages/login";
import Contact from "../../app/pages/contact"

// Définir les routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> {/* Navbar toujours visible */}
        <Outlet /> 
      </>
    ),
    children: [
      {
        path: "/", 
        element: <HomePage />, // Page d'accueil
      },
      {
        path: "urbanisme", 
        element: <Urbanisme />, // Page Urbanisme
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
        path: "contact", 
        element: <Contact />, // Contact
      },
      {
        path: "*", 
        element: <Navigate to="/" replace /> // Redirection vers la page d'accueil pour les routes inconnues
      }
    ],
  },
]);


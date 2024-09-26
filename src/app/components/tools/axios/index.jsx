"use client"

// api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Méthode pour récupérer les médias
export const fetchMedia = async () => {
    try {
      const response = await axios.get(`${API_URL}/media`);
      return response.data;
    } catch (error) {
      console.error("Error fetching media:", error); // Log plus détaillé
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des médias');
    }
  };

// Méthode pour récupérer les articles
export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des articles');
  }
};

// Méthode POST pour ajouter un article
export const createArticle = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/articles`, data);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la création de l\'article');
  }
};

// Méthode PUT pour mettre à jour un article
export const updateArticle = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/articles/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de l\'article');
  }
};

// Méthode DELETE pour supprimer un article
export const deleteArticle = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/articles/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de l\'article');
  }
};

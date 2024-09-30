"use client";

import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const TABLE_HEAD = ["Image", "Type", "Nom", "Titre / Contenu", "Catégorie", "Actions"];

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ type: '', title: '', content: '', categorie: '', file: null });
  const [newFile, setNewFile] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const [filesResponse, articlesResponse] = await Promise.all([
        axios.get('http://localhost:3008/api/media'),
        axios.get('http://localhost:3008/api/articles')
      ]);
      const files = filesResponse.data.map(file => ({ ...file, type: 'media' }));
      const articles = articlesResponse.data.map(article => ({ ...article, type: 'article' }));
      setItems([...files, ...articles]);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    // ... (pas de changements ici, gardez votre code existant pour handleAddItem)
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setNewItem({
      type: item.type,
      title: item.type === 'media' ? item.filename : item.title,
      content: item.type === 'media' ? '' : item.content,
      categorie: item.categorie || '',
    });
    setNewFile(null);
  };

  const handleSaveItem = async (id, type) => {
    try {
      const formData = new FormData();
      if (newFile) {
        formData.append('file', newFile);
      }
      formData.append('content', newItem.content);
      formData.append('categorie', newItem.categorie);
      const endpoint = type === 'media' ? `http://localhost:3008/api/media/${id}` : `http://localhost:3008/api/articles/${id}`;

      const response = await axios.put(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setItems(items.map((item) => (
        item.id === id
          ? { ...item, filename: newFile ? newFile.name : item.filename, content: newItem.content, categorie: newItem.categorie, url: response.data.url }
          : item
      )));

      setEditingItemId(null);
      resetNewItem();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDeleteItem = async (id, type) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
        try {
            const endpoint = type === 'media' ? `http://localhost:3008/api/media/${id}` : `http://localhost:3008/api/articles/${id}`;
            
            // Appel à l'API pour supprimer l'élément
            await axios.delete(endpoint);

            // Mettre à jour l'état local pour supprimer l'élément de l'interface utilisateur
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            alert("Une erreur s'est produite lors de la suppression de l'élément.");
        }
    }
};
  const resetNewItem = () => {
    setNewItem({ type: '', title: '', content: '', categorie: '' });
    setNewFile(null);
  };

  return (
    <div className="top-0 flex flex-col items-center justify-center min-h-screen bg-red-200 my-40">
      <h2 className="text-3xl font-bold mb-4 text-yellow-900">Tableau de Bord</h2>
      <p className='text-yellow-900'>Bienvenue sur le tableau de bord de l'administrateur ou du modérateur !</p>

      <Card className="h-full w-full overflow-scroll mb-4 p-4 bg-red-200">
        {/* Formulaire pour ajouter un média ou un article */}
        <TextField
          select
          label="Type"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          variant="outlined"
          className="mr-2  text-yellow-900"
          SelectProps={{ native: true }}
          InputLabelProps={{ shrink: true }}
        >
          <option value="">Choisissez un type</option>
          <option value="media">Média</option>
          <option value="article">Article</option>
        </TextField>

        {newItem.type === 'media' && (
          <>
            <TextField
              label="Contenu"
              variant="outlined"
              value={newItem.content}
              onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
              className="mr-2"
            />
            <TextField
              label="Catégorie"
              value={newItem.categorie}
              onChange={(e) => setNewItem({ ...newItem, categorie: e.target.value })}
              variant="outlined"
              className="mr-2"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setNewFile(file); // Mettez à jour l'état avec le fichier sélectionné
                setNewItem({ ...newItem, mediaFile: file }); // Inclure le fichier dans newItem
              }}
            />
            <Button onClick={handleAddItem} variant="contained" color="primary" className="ml-2">
              <AddIcon /> Ajouter un Média
            </Button>
          </>
        )}

        {newItem.type === 'article' && (
          <>
            <TextField
              label="Titre"
              variant="outlined"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="mr-2"
            />
            <TextField
              label="Contenu"
              variant="outlined"
              value={newItem.content}
              onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
              multiline
              rows={4}
              className="mr-2"
            />
            <TextField
              label="Catégorie"
              value={newItem.categorie}
              onChange={(e) => setNewItem({ ...newItem, categorie: e.target.value })}
              variant="outlined"
              className="mr-2"
            />
            <Button onClick={handleAddItem} variant="contained" color="primary" className="ml-2">
              <AddIcon /> Ajouter un Article
            </Button>
          </>
        )}
      </Card>

      <Card className="h-full w-full overflow-scroll mb-4 p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head}>
                  <Typography variant="small" color="blue-gray" className="font-bold">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  {editingItemId === item.id ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setNewFile(file);
                            setNewItem({ ...newItem, mediaFile: file }); // Inclure le fichier dans newItem pour une utilisation future
                          }
                        }}
                      />
                      {newFile && (
                        <img src={URL.createObjectURL(newFile)} alt={newFile.name} width="100" /> 
                      )}
                    </>
                  ) : (
                    item.type === 'media' && <img src={item.url} alt={item.filename} width="100" />
                  )}
                </td>

                <td>{item.type}</td>

                <td>
                  {editingItemId === item.id ? (
                    <TextField
                      label="Titre"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    />
                  ) : (
                    item.type === 'media' ? item.filename : item.title
                  )}
                </td>

                <td>
                  {editingItemId === item.id ? (
                    <TextField
                      label="Contenu"
                      value={newItem.content}
                      onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                    />
                  ) : (
                    item.type === 'media' ? '' : item.content
                  )}
                </td>

                <td>
                  {editingItemId === item.id ? (
                    <TextField
                      label="Catégorie"
                      value={newItem.categorie}
                      onChange={(e) => setNewItem({ ...newItem, categorie: e.target.value })}
                    />
                  ) : (
                    item.categorie
                  )}
                </td>

                <td>
                  {editingItemId === item.id ? (
                    <>
                      <Button
                        onClick={() => handleSaveItem(item.id, item.type)}
                        variant="contained"
                        color="primary"
                      >
                        Enregistrer
                      </Button>
                      <Button
                        onClick={() => setEditingItemId(null)}
                        variant="outlined"
                        color="secondary"
                        className="ml-2"
                      >
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleEditItem(item)}
                        variant="outlined"
                        color="primary"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(item.id, item.type)}
                        variant="outlined"
                        color="secondary"
                        className="ml-2"
                      >
                        <DeleteIcon />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Dashboard;

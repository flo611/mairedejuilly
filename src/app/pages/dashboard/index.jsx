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
    if (newItem.type === 'media' && newFile) {
      const formData = new FormData();
      formData.append('file', newFile);
      formData.append('content', newItem.content);
      formData.append('categorie', newItem.categorie);

      try {
        const response = await axios.post('http://localhost:3008/api/media/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setItems([...items, { ...response.data.file, content: newItem.content, categorie: newItem.categorie, type: 'media' }]);
        resetNewItem();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else if (newItem.type === 'article') {
      try {
        const response = await axios.post('http://localhost:3008/api/articles', {
          title: newItem.title,
          content: newItem.content,
          categorie: newItem.categorie
        });
        setItems([...items, { ...response.data, type: 'article' }]);
        resetNewItem();
      } catch (error) {
        console.error('Error adding article:', error);
      }
    }
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
      if (type === 'media') {
        const formData = new FormData();
        if (newFile) {
          formData.append('file', newFile); // Inclure le nouveau fichier si présent
        }
        formData.append('content', newItem.content);
        formData.append('categorie', newItem.categorie);

        const response = await axios.put(`http://localhost:3008/api/media/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Mettre à jour les éléments dans l'état
        setItems(items.map((item) => (
          item.id === id
            ? { ...item, filename: newFile ? newFile.name : item.filename, content: newItem.content, categorie: newItem.categorie, url: response.data.url }
            : item
        )));
      } else if (type === 'article') {
        const response = await axios.put(`http://localhost:3008/api/articles/${id}`, {
          title: newItem.title,
          content: newItem.content,
          categorie: newItem.categorie
        });

        // Mettre à jour les articles dans l'état
        setItems(items.map((item) => (
          item.id === id
            ? { ...item, title: response.data.title, content: response.data.content, categorie: response.data.categorie }
            : item
        )));
      }

      setEditingItemId(null);
      resetNewItem();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDeleteItem = async (id, type) => {
    try {
      if (type === 'media') {
        await axios.delete(`http://localhost:3008/api/media/${id}`);
      } else if (type === 'article') {
        await axios.delete(`http://localhost:3008/api/articles/${id}`);
      }
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
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

      {/* Section Ajouter un média ou un article */}
        <Card className="h-full w-full overflow-scroll mb-4 p-4 bg-red-200">
        <TextField
           select
            label="Type"
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            variant="outlined"
            className="mr-2  text-yellow-900"
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }} // Ajout du shrink pour que le label reste visible
          >
            <option value="">
            Choisissez un type
            </option>
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
                setNewFile(e.target.files[0]);
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

      {/* Tableau des médias/articles */}
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
                            const url = URL.createObjectURL(file);
                            setNewItem({ ...newItem, mediaFile: file, url });
                          }
                        }}
                      />
                      {newItem.url && (
                        <img src={newItem.url} alt={newItem.filename} width="100" />
                      )}
                    </>
                  ) : (
                    item.type === 'media' ? (
                      <img src={item.url} alt={item.filename} width="100" />
                    ) : null
                  )}
                </td>

                {/* Champ de type */}
                <td>{item.type}</td>

                {/* Titre - modifiable */}
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

                {/* Contenu - modifiable */}
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

                {/* Catégorie - modifiable */}
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

                {/* Boutons d'action */}
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

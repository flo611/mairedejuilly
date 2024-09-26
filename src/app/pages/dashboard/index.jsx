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
  const [newItem, setNewItem] = useState({ type: '', title: '', content: '', category: '', file: null });
  const [newFile, setNewFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [editingItemId, setEditingItemId] = useState(null); // ID de l'élément en cours d'édition

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
      setItems([...files, ...articles]); // Combine les fichiers et les articles
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    if (newItem.type === 'media' && newFile) {
      const formData = new FormData();
      formData.append('file', newFile);
      formData.append('content', newItem.content); // Ajout du contenu ici
      formData.append('categorie', newItem.category); // Catégorie saisie par l'utilisateur

      try {
        const response = await axios.post('http://localhost:3008/api/media/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setItems([...items, { ...response.data.file, content: newItem.content, category: newItem.category, type: 'media' }]); // Inclure le contenu et la catégorie
        setNewFile(null);
        setFileName('');
        setNewItem({ type: '', title: '', content: '', category: '' }); // Réinitialiser le formulaire
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else if (newItem.type === 'article') {
      try {
        const response = await axios.post('http://localhost:3008/api/articles', { title: newItem.title, content: newItem.content, category: newItem.category });
        setItems([...items, { ...response.data, type: 'article' }]);
        setNewItem({ type: '', title: '', content: '', category: '' }); // Réinitialiser le formulaire
      } catch (error) {
        console.error('Error adding article:', error);
      }
    }
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setNewItem({ type: item.type, title: item.type === 'media' ? item.filename : item.title, content: item.type === 'media' ? '' : item.content, category: item.category || '' });
    setNewFile(null); // Reset newFile
  };

  const handleSaveItem = async (id, type) => {
    try {
      if (type === 'media') {
        // Logique pour sauvegarder les modifications du média
        if (newFile) {
          const formData = new FormData();
          formData.append('file', newFile);
          formData.append('content', newItem.content); // Mise à jour du contenu
          formData.append('categorie', newItem.category); // Mise à jour de la catégorie

          await axios.put(`http://localhost:3008/api/media/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setItems(items.map(item => (item.id === id ? { ...item, filename: newFile.name, content: newItem.content, category: newItem.category } : item))); // Mise à jour
        }
      } else if (type === 'article') {
        const response = await axios.put(`http://localhost:3008/api/articles/${id}`, { title: newItem.title, content: newItem.content, category: newItem.category });
        setItems(items.map(item => (item.id === id ? { ...item, title: response.data.title, content: response.data.content, category: response.data.category } : item)));
      }
      setEditingItemId(null); // Fermer l'édition
      setNewItem({ type: '', title: '', content: '', category: '' }); // Réinitialiser le formulaire
      setNewFile(null); // Réinitialiser newFile
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
          className="mr-2 text-yellow-900"
          SelectProps={{
            native: true,
          }}
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
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              variant="outlined"
              className="mr-2"
            />
            <input
              type="file"
              onChange={(e) => {
                setNewFile(e.target.files[0]);
                setFileName(e.target.files[0]?.name);
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
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              variant="outlined"
              className="mr-2"
            />
            <Button onClick={handleAddItem} variant="contained" color="primary" className="ml-2">
              <AddIcon /> Ajouter un Article
            </Button>
          </>
        )}
      </Card>

      {/* Section Tableau d'Items */}
      <Card className="h-full w-full overflow-scroll mb-4 p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head}>
                  <Typography variant="small" color="blue-gray" className="font-normal">{head}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(({ id, filename, title, content, type, category }) => {
              const classes = "p-4 border-b border-blue-gray-200";
              return (
                <tr key={id}>
                  <td className={classes}>
                    {type === 'media' && (
                      <img
                        src={`http://localhost:3008/media/${filename}`}
                        alt={filename}
                        className="w-16 h-16 object-cover"
                      />
                    )}
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">{type}</Typography>
                  </td>
                  <td className={classes}>
                    {editingItemId === id ? (
                      <TextField
                        value={filename}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        variant="outlined"
                      />
                    ) : (
                      <Typography variant="small" color="blue-gray" className="font-normal">{type === 'media' ? filename : title}</Typography>
                    )}
                  </td>
                  <td className={classes}>
                    {editingItemId === id ? (
                      <TextField
                        value={content}
                        onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                        variant="outlined"
                        multiline
                        rows={1}
                        onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                      />
                    ) : (
                      <Typography variant="small" color="blue-gray" className="font-normal">{content}</Typography>
                    )}
                  </td>
                  <td className={classes}>
                    {editingItemId === id ? (
                      <TextField
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        variant="outlined"
                      />
                    ) : (
                      <Typography variant="small" color="blue-gray" className="font-normal">{category}</Typography>
                    )}
                  </td>
                  <td className={classes}>
                    {editingItemId === id ? (
                      <Button onClick={() => handleSaveItem(id, type)} variant="contained" color="primary" className="ml-2">
                        Enregistrer
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => handleEditItem({ id, type, filename, content, category })} variant="outlined" color="primary">
                          <EditIcon />
                        </Button>
                        <Button onClick={() => handleDeleteItem(id, type)} variant="outlined" color="secondary" className="ml-2">
                          <DeleteIcon />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Dashboard;

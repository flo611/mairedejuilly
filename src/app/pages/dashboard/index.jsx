"use client";
import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const TABLE_HEAD = ["Image", "Type", "Nom", "Titre / Contenu", "Actions"];

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ type: '', title: '', content: '', file: null });
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
      formData.append('categorie', 'Uncategorized'); // Catégorie par défaut

      try {
        const response = await axios.post('http://localhost:3008/api/media/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setItems([...items, { ...response.data.file, type: 'media' }]);
        setNewFile(null);
        setFileName('');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else if (newItem.type === 'article') {
      try {
        const response = await axios.post('http://localhost:3008/api/articles', { title: newItem.title, content: newItem.content });
        setItems([...items, { ...response.data, type: 'article' }]);
        setNewItem({ type: '', title: '', content: '' }); // Reset form
      } catch (error) {
        console.error('Error adding article:', error);
      }
    }
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setNewItem({ type: item.type, title: item.type === 'media' ? item.filename : item.title, content: item.type === 'media' ? '' : item.content });
    setNewFile(null); // Reset newFile
  };

  const handleSaveItem = async (id, type) => {
    try {
      if (type === 'media') {
        // Logique pour sauvegarder les modifications du média
        if (newFile) {
          const formData = new FormData();
          formData.append('file', newFile);
          formData.append('categorie', 'Uncategorized'); // Vous pouvez changer cela si nécessaire

          await axios.put(`http://localhost:3008/api/media/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setItems(items.map(item => (item.id === id ? { ...item, filename: newFile.name } : item))); // Mise à jour du nom du fichier
        }
      } else if (type === 'article') {
        const response = await axios.put(`http://localhost:3008/api/articles/${id}`, { title: newItem.title, content: newItem.content });
        setItems(items.map(item => (item.id === id ? { ...item, title: response.data.title, content: response.data.content } : item)));
      }
      setEditingItemId(null); // Fermer l'édition
      setNewItem({ type: '', title: '', content: '' }); // Reset form
      setNewFile(null); // Reset newFile
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
    <div className="top-0 flex flex-col items-center justify-center min-h-screen bg-gray-100 my-40">
      <h2 className="text-3xl font-bold mb-4">Tableau de Bord</h2>
      <p>Bienvenue sur le tableau de bord de l'administrateur ou du modérateur !</p>

      {/* Section Ajouter un média ou un article */}
      <Card className="h-full w-full overflow-scroll mb-4 p-4">
        <TextField
          select
          label="Type"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          variant="outlined"
          className="mr-2"
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
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="mr-2"
            />
            <Button onClick={handleAddItem} variant="contained" color="primary">
              <AddIcon /> Ajouter un Article
            </Button>
          </>
        )}
      </Card>

      {/* Tableau de Médias et Articles */}
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 bg-black text-white">
                  <Typography variant="small" color="white" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(({ id, filename, title, content, type }, index) => {
              const isLast = index === items.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    {type === 'media' && (
                      <img
                        src={`http://localhost:3008/${filename}`} // Assurez-vous que le chemin est correct
                        alt={filename}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {type === 'media' ? 'Média' : 'Article'}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {editingItemId === id ? (
                      <TextField
                        value={type === 'media' ? filename : title}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        variant="outlined"
                      />
                    ) : (
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {type === 'media' ? filename : title}
                      </Typography>
                    )}
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    {editingItemId === id ? (
                      type === 'media' ? (
                        <>
                          <input
                            type="file"
                            onChange={(e) => setNewFile(e.target.files[0])}
                          />
                          <Button onClick={() => handleSaveItem(id, type)} color="primary">
                            Enregistrer
                          </Button>
                        </>
                      ) : (
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
                      )
                    ) : (
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {content}
                      </Typography>
                    )}
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50 flex space-x-4`}>
                    {editingItemId === id ? (
                      <Button onClick={() => setEditingItemId(null)} color="secondary">
                        Annuler
                      </Button>
                    ) : (
                      <Button onClick={() => handleEditItem({ id, filename, title, content, type })} color="primary">
                        <EditIcon fontSize="small" />
                      </Button>
                    )}
                    <Button onClick={() => handleDeleteItem(id, type)} color="secondary">
                      <DeleteIcon fontSize="small" />
                    </Button>
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

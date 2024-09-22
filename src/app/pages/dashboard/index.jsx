"use client";
import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const TABLE_HEAD_FILES = ["Image", "Name", "Job", "Employed", "Actions"];
const TABLE_HEAD_ARTICLES = ["Title", "Content", "Actions"];

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    fetchFiles();
    fetchArticles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3008/api/media');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3008/api/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleAddFile = async () => {
    if (!newFile) return;

    const formData = new FormData();
    formData.append('file', newFile);
    formData.append('categorie', 'Uncategorized'); // Ajouter catégorie si nécessaire

    try {
      const response = await axios.post('http://localhost:3008/api/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFiles([...files, response.data.file]);
      setNewFile(null);
      setFileName('');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleEditFile = async (id) => {
    console.log(`Editing file with ID: ${id}`);
    // Logique d'édition (peut être une modal pour mettre à jour le fichier)
  };

  const handleDeleteFile = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/api/media/${id}`);
      setFiles(files.filter(file => file.id !== id));
      console.log(`Deleted file with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleAddArticle = async () => {
    try {
      const response = await axios.post('http://localhost:3008/api/articles', newArticle);
      setArticles([...articles, response.data]);
      setNewArticle({ title: '', content: '' }); // Reset form
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  const handleEditArticle = async (id) => {
    console.log(`Editing article with ID: ${id}`);
    // Logique d'édition (e.g. ouvrir un modal pour mettre à jour l'article)
  };

  const handleDeleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/api/articles/${id}`);
      setArticles(articles.filter(article => article.id !== id));
      console.log(`Deleted article with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 my-40">
      <h2 className="text-3xl font-bold mb-4">Tableau de Bord</h2>
      <p>Bienvenue sur le tableau de bord de l'administrateur ou du modérateur !</p>

      {/* Section Médias */}
      <Card className="h-full w-full overflow-scroll mb-4">
        <h3 className="text-2xl font-bold mb-2">Médias</h3>
        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => {
              setNewFile(e.target.files[0]);
              setFileName(e.target.files[0]?.name);
            }}
          />
          <Button onClick={handleAddFile} variant="contained" color="primary">
            <AddIcon /> Ajouter un Média
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD_FILES.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 bg-black text-white">
                  <Typography variant="small" color="white" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {files.map(({ id, filename, job, date, imageUrl }, index) => {
              const isLast = index === files.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <img src={imageUrl} alt={filename} className="h-16 w-16 object-cover" />
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {filename}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {job}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {date}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50 flex space-x-4`}>
                    <Button onClick={() => handleEditFile(id)} color="primary">
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button onClick={() => handleDeleteFile(id)} color="secondary">
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Section Articles */}
      <Card className="h-full w-full overflow-scroll">
        <h3 className="text-2xl font-bold mb-2">Articles</h3>
        <div className="mb-4">
          <TextField
            label="Titre"
            variant="outlined"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            className="mr-2"
          />
          <TextField
            label="Contenu"
            variant="outlined"
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
            className="mr-2"
          />
          <Button onClick={handleAddArticle} variant="contained" color="primary">
            <AddIcon /> Ajouter un Article
          </Button>
        </div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD_ARTICLES.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 bg-black text-white">
                  <Typography variant="small" color="white" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map(({ id, title, content }, index) => {
              const isLast = index === articles.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {title}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {content}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50 flex space-x-4`}>
                    <Button onClick={() => handleEditArticle(id)} color="primary">
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button onClick={() => handleDeleteArticle(id)} color="secondary">
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

"use client"; // Indique que ce composant doit être rendu côté client

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const Urbanisme = () => {
  const [items, setItems] = useState([]); // État pour stocker les articles et médias
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur
  const [selectedItem, setSelectedItem] = useState(null); // État pour l'élément sélectionné
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture du modal

  // Fonction pour récupérer les articles et médias
  const fetchItems = async () => {
    try {
      const [filesResponse, articlesResponse] = await Promise.all([
        axios.get('http://localhost:3008/api/media'), // API pour les médias
        axios.get('http://localhost:3008/api/articles') // API pour les articles
      ]);

      // Combiner les fichiers et les articles
      const files = filesResponse.data.map(file => ({ ...file, type: 'media' }));
      const articles = articlesResponse.data.map(article => ({ ...article, type: 'article' }));
      setItems([...files, ...articles]); // Mettre à jour l'état avec les articles et médias
    } catch (error) {
      console.error('Error fetching items:', error); // Gérer l'erreur
      setError('Erreur lors de la récupération des éléments.');
    } finally {
      setLoading(false); // Indiquer que le chargement est terminé
    }
  };
  // Utiliser useEffect pour appeler fetchItems lors du premier rendu
  useEffect(() => {
    fetchItems();
  }, []);

  // Fonction pour ouvrir le modal avec l'élément sélectionné
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Affichage en fonction de l'état
  if (loading) {
    return <div>Chargement...</div>; // Afficher un message de chargement
  }

  if (error) {
    return <div>{error}</div>; // Afficher l'erreur
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mt-40">
        {items.map((item) => (
          <Card key={item.id} className="w-full max-w-[26rem] shadow-lg lg:mx-10">
            <CardHeader floated={false} color="blue-gray">
              <img
                src={item.type === 'media' ? item.fileurl : 'fallback-image-url'} // Utiliser l'URL de l'image pour les médias
                alt={item.type === 'media' ? item.filename : item.title}
                className="h-56 w-full object-cover rounded-t-lg" // Style pour l'image
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              <IconButton
                size="sm"
                color="red"
                variant="text"
                className="!absolute top-4 right-4 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </IconButton>
            </CardHeader>
            <CardBody>
              <div className="mb-3 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                  {item.type === 'article' ? item.title : 'Media Title'} {/* Titre ou nom du média */}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center gap-1.5 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-0.5 h-5 w-5 text-yellow-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  5.0 {/* Vous pouvez ajuster cela selon vos données */}
                </Typography>
              </div>
              <Typography color="gray">
                {item.type === 'article' ? item.content : 'Media description'} {/* Description ou contenu */}
              </Typography>
              <div className="flex justify-center mt-8"> {/* Centrage du bouton */}
                <Button 
                  size="lg" 
                  onClick={() => openModal(item)} 
                  className="bg-red-400 text-white hover:bg-red-500"
                >
                  En savoir +
                </Button>
              </div>
            </CardBody>
            <CardFooter className="pt-3">
            <Button size="lg" fullWidth={true}>
          Reserve
        </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal pour afficher le contenu en plein écran */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white rounded-lg p-4 w-full max-w-3xl">
            <button onClick={closeModal} className="absolute top-4 right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path d="M12 10.586l4.243-4.243a1 1 0 011.414 1.414L13.414 12l4.243 4.243a1 1 0 01-1.414 1.414L12 13.414l-4.243 4.243a1 1 0 01-1.414-1.414L10.586 12 6.343 7.757a1 1 0 011.414-1.414L12 10.586z" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedItem?.type === 'article' ? selectedItem.title : 'Media Title'}</h2>
            <img
              src={selectedItem?.type === 'media' ? selectedItem.fileurl : 'fallback-image-url'}
              alt={selectedItem?.type === 'media' ? selectedItem.filename : selectedItem.title}
              className="w-full h-auto mb-4 rounded"
            />
            <p className="text-gray-700">{selectedItem?.type === 'article' ? selectedItem.content : 'Media description'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Urbanisme;

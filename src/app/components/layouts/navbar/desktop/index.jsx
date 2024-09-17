"use client";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importer useNavigate de react-router-dom
import Image from "next/image"; // Pour afficher le logo

const NavbarDesktop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour savoir si l'utilisateur est connecté ou non
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  // Vérifier si l'utilisateur est connecté (exemple avec localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fonction pour rediriger vers la page appropriée (login ou dashboard)
  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard"); // Utiliser navigate pour la redirection
    } else {
      navigate("/login"); // Utiliser navigate pour la redirection
    }
  };

  return (
    <header>
      <nav className="navbar hidden lg:flex w-full fixed top-0 z-50 flex-col-3 items-center justify-center">
        <div>
          <div className="pt-5 dark:hidden">
            <a href="/" aria-label="voir site mairie">
              <Image
                src="/images/Blason.svg.png"
                alt="logoPF"
                width={75}
                height={75}
              />
            </a>
          </div>
          <div className="pt-5 hidden dark:flex"></div>
        </div>
        <div className="hidden lg:flex flex-row w-full py-5 justify-center items-center list-none text-amber-800 dark:text-slate-100 text-lg uppercase font-medium font-nunitoRegular">
          <ul className="w-full grid grid-cols-4">
            <div className="flex flex-row items-center justify-between col-span-3 pl-40">
              <li className="hover:text-white hover:transition hover:ease-in-out hover:duration-200 hover:border-b-2 hover:border-white">
                <a href="/">Accueil</a>
              </li>
              <li className="hover:text-white hover:transition hover:ease-in-out hover:duration-200 hover:border-b-2 hover:border-white">
                Compétences
              </li>
              <li className="hover:text-white hover:transition hover:ease-in-out hover:duration-200 hover:border-b-2 hover:border-white">
                Contact
              </li>
              <li>
                {/* Icône de login */}
                <button
                  aria-label="Login"
                  onClick={handleLoginClick}
                  className="text-xl hover:text-white"
                >
                  <FaUser />
                </button>
              </li>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                id="al"
                aria-label="dark"
                onClick={() => {
                  DarkMode();
                  setShowButton(!showButton);
                }}
              >
                {/* Contenu du bouton */}
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavbarDesktop;

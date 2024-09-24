import { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import Image from "next/image"; 

import { Link } from "react-router-dom";

const NavbarDesktop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Vérifie si le token est présent
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Déconnexion
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/"); // Redirection vers la page d'accueil
    } else {
      navigate("/login"); // Redirection vers la page de connexion
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
        </div>
        <div className="hidden lg:flex flex-row w-full py-5 justify-center items-center list-none text-amber-800 dark:text-slate-100 text-lg uppercase font-medium font-nunitoRegular">
          <ul className="w-full grid grid-cols-4">
            <div className="flex flex-row items-center justify-between col-span-3 pl-40">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/urbanisme">Urbanisme</Link></li> 
              <li><Link to="./contact"> Contact </Link></li>
              <li>
                <button
                  aria-label={isLoggedIn ? "Logout" : "Login"}
                  onClick={handleAuthClick}
                  className="text-xl hover:text-white"
                >
                  {isLoggedIn ? <FaSignOutAlt /> : <FaUser />}
                </button>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavbarDesktop;

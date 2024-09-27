import { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa"; // Importation de l'icône de tableau de bord
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
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
    <nav className="fixed top-0 z-10 w-full bg-red-300">
      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <input type="checkbox" name="toggle_nav" id="toggle_nav" className="peer hidden" />

          <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
            {/* Affichage du logo et du nom de la mairie */}
            <a href="/" aria-label="logo" className="flex space-x-2 items-center">
              <img src="/images/Blason.svg.png" className="w-12" alt="logo mairie" width="144" height="133" />
              <span className="text-2xl font-bold text-yellow-900 hover:text-yellow-200">Mairie Juilly</span>
            </a>

            <div className="flex items-center lg:hidden max-h-10">
              <label role="button" htmlFor="toggle_nav" aria-label="hamburger" id="hamburger" className="relative w-10 h-auto p-2">
                <div className="line-1 m-auto h-0.5 w-6 rounded bg-yellow-900 dark:bg-white transition duration-300"></div>
                <div className="line-2 m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900 dark:bg-white transition duration-300"></div>
              </label>
            </div>
          </div>

          {/* Overlay */}
          <label role="button" htmlFor="toggle_nav" className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-yellow-200 dark:bg-black dark:bg-opacity-80 bg-opacity-30 backdrop-blur backdrop-filter"></label>

          {/* Menu items */}
          <div className="hidden peer-checked:flex w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white dark:bg-gray-900 lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
            <div className="text-gray-600 lg:pr-4 w-full">
              <ul className="tracking-wide font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                <li>
                  <a href="/" className="block md:px-4 transition text-yellow-900 hover:text-yellow-200 ">
                    <span>Accueil</span>
                  </a>
                </li>
                <li>
                  <Link to="/urbanisme" className="block md:px-4 transition text-yellow-900 hover:text-yellow-200 ">
                    <span>Urbanisme</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block md:px-4 transition text-yellow-900 hover:text-yellow-200 ">
                    <span>Contact</span>
                  </Link>
                </li>
                {/* Lien vers le tableau de bord, affiché uniquement si connecté */}
                {isLoggedIn && (
                  <li>
                    <Link to="/dashboard" className="block md:px-4 transition text-yellow-900 hover:text-yellow-200 ">
                      <span className="flex items-center">
                        {/* Icône de tableau de bord */}
                        <FaTachometerAlt className="h-5 w-5 mr-1" />
                        Dashboard
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="w-full min-w-max space-y-2 border-yellow-200 lg:space-y-0 sm:w-max lg:border-l dark:lg:border-gray-700">
              <button
                type="button"
                title={isLoggedIn ? "Logout" : "Login"}
                onClick={handleAuthClick}
                className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
              >
                <span className="block text-yellow-900 font-semibold text-sm">
                  {isLoggedIn ? <FaSignOutAlt className="inline-block" /> : <FaUser className="inline-block" />}
                  {isLoggedIn ? "Logout" : "Login"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

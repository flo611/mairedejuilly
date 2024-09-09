"use client"
import { useState } from "react";

import Image from 'next/image'; // Ajoutez cette ligne en haut de votre fichier


const NavbarDesktop = () => {
    const [showButton, setShowButton] = useState(false);
  
    return (
      <header>
        <nav className="navbar hidden lg:flex w-full fixed top-0 z-50 flex-col-3 items-center justify-center ">
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
            <div className="pt-5 hidden dark:flex">
 
            </div>
          </div>
          <div className="hidden lg:flex flex-row w-full py-5 justify-center items-center list-none text-amber-800 dark:text-slate-100 text-lg uppercase font-medium font-nunitoRegular ">
            <ul className="w-full grid grid-cols-4">
              <div className="flex flex-row items-center justify-between col-span-3 pl-40">
                <li className="hover:text-black hover:transition hover:ease-in-out hover:duration-200 hover:border-b-2 hover:border-amber-800 dark:hover:text-amber-800 dark:hover:border-cyan-800">
                  <a >Accueil</a>
                </li>
                <li className="hover:text-black hover:transition hover:ease-in-out hover:duration-200 hover:border-b-2 hover:border-amber-800 dark:hover:text-amber-800 dark:hover:border-cyan-800">
                 
                    Compétences
                 
                </li>
                <li className="hover:text-black hover:transition hover:ease-in-out hover:duration-200 hover:border-b-2 hover:border-amber-800 dark:hover:text-amber-800 dark:hover:border-cyan-800">
                
                    Projets
               
                </li>
                <li className="hover:text-black hover:transition hover:ease-in-out hover:duration-200 hover:border-b-2 hover:border-amber-800 dark:hover:text-amber-800 dark:hover:border-cyan-800">
                 
                    Expériences
            
                </li>
                <li className="hover:text-black hover:transition hover:ease-in-out hover:duration-200 hover:border-b-2 hover:border-amber-800 dark:hover:text-amber-800 dark:hover:border-cyan-800">
                
                    Contact
              
                </li>
              </div>
              <div className="flex justify-center ">
                <button
                  type="button"
                  id="al"
                  aria-label="dark"
                  onClick={() => {
                    DarkMode();
                    setShowButton(!showButton);
                  }}
                >
                  {showButton === false ? (
                  <p className="bg-red-300"></p>
                  ) : (
                    <p className="bg-green-400"></p>
                  )}
                </button>
              </div>
            </ul>
          </div>
        </nav>
      </header>
    );
  };
  export default NavbarDesktop;
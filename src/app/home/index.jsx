"use client"
import MaireIntro from "../home/section/maire.intro"

const HomePage = () => {

    return (
      <div>
        <section className="container mx-auto my-40 p-8">
          <h2 className="text-2xl font-bold mb-4 text-red-500 flex justify-center">Bienvenue à la Mairie de Juilly</h2>
         <MaireIntro/>
        </section>
      </div>
    );

  };
  
  export default HomePage;
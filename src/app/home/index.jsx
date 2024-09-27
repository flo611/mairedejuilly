"use client"
import MaireIntro from "../home/section/maire.intro"

const HomePage = () => {

    return (
      <div>
        <section className="container mx-auto py-32  ">
          <h2 className="text-2xl font-bold mb-4 text-yellow-900 flex justify-center">Bienvenue à la Mairie de Juilly</h2>
          <div className=" lg:w-full">
         <MaireIntro/>
         </div>
        </section>
      </div>
    );

  };
  
  export default HomePage;
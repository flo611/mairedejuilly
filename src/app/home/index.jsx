const HomePage = () => {

    return (
      <div>
        <main className="container mx-auto p-8">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Bienvenue à la Mairie de Juilly</h2>
          <p className="mb-4">
            Découvrez notre commune, ses actualités, et toutes les informations pratiques dont vous avez besoin.
          </p>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Exemples d'articles récents */}
            <article className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-xl font-semibold">Article 1</h3>
              <p>Ceci est un exemple d'article de la mairie.</p>
            </article>
            <div className="p-4 bg-gray-600 rounded shadow border-8 border-red-700">
              <h3 className="text-xl font-semibold">Article 2</h3>
              <p>Ceci est un autre exemple d'article de la mairie.</p>
            </div>
          </section>
        </main>
      </div>
    );

  };
  
  export default HomePage;
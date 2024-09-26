    "use client"

        const  MaireIntro =()=>{

            return(
                
                <section>
        <div classname="py-20">
        <div classname="container mx-auto px-6 text-center md:px-12 ">
        <div classname="mb-16">
            <h2 classname="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl ">
            Tailus blocks leadership
            </h2>
            <p classname="text-gray-600 dark:text-gray-300 lg:mx-auto lg:w-8/12">
            Tailus prides itself not only on award-winning technology, but also on the talent of its
            people of some of the brightest minds and most experienced executives in business.
            </p>
        </div>
        <div className="grid gap-28 py-20 md:grid-cols-3 md:gap-12 lg:flex lg:justify-center lg:items-center">
        <div className="group space-y-8 border-t-4 border-gray-500 dark:border-gray-800">
            <div className="mx-auto mt-16 h-32 w-32 rotate-45 overflow-hidden rounded-[2rem] ">
                <img
                    className="mx-auto h-full w-full -rotate-45 scale-125 object-cover transition duration-300 group-hover:scale-[1.4]"
                    src="/images/maire.png"
                    alt="Maire"
                    loading="lazy"
                    width="640"
                    height="805"
                />
            </div>
            <div className="space-y-4 text-center">
                <div className="w-full flex flex-col  justify-center lg:flex-col">
                    <h4 className="text-2xl text-yellow-900  py-2">Daniel HACQUIN</h4>
                    <div>
                    <span className="block text-sm text-yellow-900">Mairie de Juilly</span>
                    </div>
                </div>
                <a href="#" className="mx-auto block w-max text-primary"></a>
            </div>
        </div>
    </div>                                 
            </div>
            </div>
                </section>
            )
        }

        export default MaireIntro;

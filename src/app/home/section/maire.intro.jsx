"use client";
import MyCalendar from "../../components/layouts/calendar";

const MaireIntro = () => {
    return (
        <section>
            <div className="py-20">
                <div className="container mx-auto px-6 text-center md:px-12">
                    {/* Introduction */}
                    <div className="mb-16 lg:w-full lg:mx-auto lg:flex lg:flex-row lg:justify-center">
                        <p className="lg:w-full lg:mx-auto lg:flex lg:flex-row lg:justify-center">
                            Tailus prides itself not only on award-winning technology, but also on the talent of its
                            people of some of the brightest minds and most experienced executives in business.
                        </p>
                    </div>
                    {/* Contenu principal aligné en flex */}
                    <div className="flex flex-col lg:flex-col lg:justify-center lg:items-center py-20">
                        {/* Section avec image et nom */}
                        <div className="group space-y-8 border-t-4 mx-20 border-yellow-300 mb-10">
                            <div className="mx-auto h-32 w-32 rotate-45 overflow-hidden rounded-[2rem]">
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
                                <div className="w-full flex flex-col justify-center lg:flex-col">
                                    <h4 className="text-2xl text-yellow-900 py-2">Daniel HACQUIN</h4>
                                    <span className="block text-sm text-yellow-900">Mairie de Juilly</span>
                                </div>
                            </div>
                        </div>
                        {/* Calendrier aligné au centre en dessous */}
                        <div className="flex justify-center items-center w-full">
                            <MyCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MaireIntro;

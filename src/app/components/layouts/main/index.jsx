import React from 'react';
import '../../../assets/css/styles.css';

const Main = ({ children }) => {
    return (
        <div className="relative background-container top-0 h-full w-full">
            {/* Arrière-plan radial en rouge et orange */}
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,0,0,0.3),rgba(255,165,0,0))]" />
            {children} {/* Vous pouvez insérer les autres composants ici */}
        </div>
    );
};

export default Main;

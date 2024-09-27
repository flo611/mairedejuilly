import React from 'react';
import '../../../assets/css/styles.css'

const Main = ({ children }) => {
    return (
        <div className="background-container top-0 h-full w-full">
            {children} {/* Vous pouvez insérer les autres composants ici */}
        </div>
    );
};

export default Main;

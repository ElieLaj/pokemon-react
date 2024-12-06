import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            <p>&copy; {new Date().getFullYear()} Pokémon React. Tous droits réservés.</p>
        </footer>
    );
};

export default Footer;
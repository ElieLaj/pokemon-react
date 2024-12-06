import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import SearchBar from '../SearchBar/SearchBar';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const search = (input: string) => {
        navigate(`/search/${input}`);
     };

    return (
        <header className="header">
            <nav>
                <ul>
                     <div>
                            <h1>PokéDev</h1>
                            <img src="/logo.png" alt="" />
                        </div>
                    <li>
                        <Link to="/">Home</Link>
                        <Link to="battle">Combat</Link>
                        <Link to="random">Pokémon aléatoire</Link>
                        <Link to="pokemon/generations">Générations pokemons</Link>
                        <Link to="types">Tous les types</Link>
                    </li>
                    <div>
                        <SearchBar onSearch={(input: string) => search(input)}/>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
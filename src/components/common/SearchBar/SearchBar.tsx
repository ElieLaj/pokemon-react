import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SearchBar.scss';
const SearchBar = ({onSearch}: {onSearch: (search: string) => void }) => {
    const [search, setSearch] = useState('');

    const searchClicked = () => {
        onSearch(search);
    }
    
    return (
        <div className="search">
            <input 
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button onClick={() => searchClicked()}>Chercher</button>
        </div>
    );
};

export default SearchBar;
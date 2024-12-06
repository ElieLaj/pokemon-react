import { useState } from "react";
import "./App.css";

import Footer from "./components/common/Footer/Footer";
import Header from "./components/common/Header/Header";
import RandomPokemon from "./views/RandomPokemon/RandomPokemon";
import Home from "./views/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonDetails from "./views/PokemonDetails";
import Generation from "./components/pokemon/Generations";
import TypeList from "./views/TypeList/TypeList";
import PokemonByType from "./views/PokemonByType/PokemonByType";
import Battle from "./components/fight/Battle/battle";
import Game from "./components/fight/Game/Game";
import PokemonSearch from "./views/PokemonSearch/PokemonSearch";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="types" element={<TypeList />} />
        <Route path="random" element={<RandomPokemon />} />
        <Route path="battle" element={<Game />} />
        <Route path="pokemon/:id" element={<PokemonDetails />} />
        <Route path="pokemon/generations" element={<Generation />} />
        <Route path="pokemon/type/:type" element={<PokemonByType />} />
        <Route path="search/:searchName" element={<PokemonSearch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

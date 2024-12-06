import React from "react";
import { PokemonType } from "../../../models/type";
import "./ShowType.scss";
import { Link } from "react-router-dom";
import { getColorByType } from "../../../utils/pokemon.utils";
import { ApiType } from "../../../models/apiType";

interface ShowTypeProps {
  type: PokemonType | ApiType;
  allowRedirect?: boolean;
  onClick?: () => void;
}

const ShowType = ({ type, allowRedirect = false, onClick }: ShowTypeProps) => {
  return (
    <div 
      className="type" 
      style={{ background: getColorByType(type.name) }}
      onClick={onClick}
    >
      {allowRedirect ? (
        <Link to={`/pokemon/type/${type.name}`} className="type-redirect">
          <img src={type.image} alt={type.name} />
          <h2>{type.name}</h2>
        </Link>
      ) : (
        <>
          <img src={type.image} alt={type.name} />
          <h2>{type.name}</h2>
        </>
      )}
    </div>
  );
};

export default ShowType;

import React from "react";

function PokemonCard({ name, imageUrl, type }) {
  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={name} />
      <div className="pokemon-card__details">
        <p className="pokemon-card__name">{name}</p>
        <p className="pokemon-card__data">Tipo: {type}</p>
      </div>
    </div>
  );
}

export default PokemonCard;

import React from "react";

function PokemonCard({ pokemon }) {
  return (
    <div className="card">
      <img
        src={pokemon.image || "https://via.placeholder.com/150"}
        alt={pokemon.name.english}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name.english}</h5>
        <p className="card-text">Type: {pokemon.type.join(", ")}</p>
      </div>
    </div>
  );
}

export default PokemonCard;

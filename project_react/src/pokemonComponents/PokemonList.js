import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemonData }) {
  return (
    <div className="row">
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id} className="col-md-3 mb-4">
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
}

export default PokemonList;

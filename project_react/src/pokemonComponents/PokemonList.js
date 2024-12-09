import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemonData }) {
  return (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id} className="col">
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
}

export default PokemonList;

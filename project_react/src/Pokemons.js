import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "./pokemonComponents/PokemonList";
import Navbar from "./pokemonComponents/Navbar";

function Pokemons() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/pokemon/types")
      .then((response) => setTypes(response.data))
      .catch((error) => console.error("Error fetching types:", error));
  }, []);

  const fetchPokemonData = () => {
    const params = {};

    if (selectedTypes.length > 0) {
      params.type = selectedTypes; 
    }

    if (searchQuery) {
      params.query = searchQuery; 
    }

    axios
      .get("http://localhost:8080/pokemon/search", { params })
      .then((response) => setPokemonData(response.data))
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  };

  useEffect(() => {
    fetchPokemonData();
  }, [searchQuery, selectedTypes]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTypeChange = (types) => {
    setSelectedTypes(types);
  };

  return (
    <div>
      <Navbar
        onSearch={handleSearch}
        types={types}
        onTypeChange={handleTypeChange}
        selectedTypes={selectedTypes}
      />
      <div className="container mt-4">
        <PokemonList pokemonData={pokemonData} />
      </div>
    </div>
  );
}

export default Pokemons;

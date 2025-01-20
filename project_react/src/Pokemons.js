import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "./pokemonComponents/PokemonList";
import Navbar from "./pokemonComponents/Navbar";

function Pokemons() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/pokemon/types")
      .then((response) => setTypes(response.data))
      .catch((error) => console.error("Error fetching types:", error));
  }, []);

  const fetchPokemonData = () => {
    const params = {};

    if (searchQuery) params.query = searchQuery;
    if (selectedType) params.type = selectedType;

    axios
      .get("http://localhost:5000/pokemon/search", { params })
      .then((response) => setPokemonData(response.data))
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  };

  useEffect(() => {
    fetchPokemonData();
  }, [searchQuery, selectedType]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <Navbar
        onSearch={handleSearch}
        types={types}
        onTypeChange={handleTypeChange}
      />
      <div className="container mt-4">
        <PokemonList pokemonData={pokemonData} />
      </div>
    </div>
  );
}

export default Pokemons;

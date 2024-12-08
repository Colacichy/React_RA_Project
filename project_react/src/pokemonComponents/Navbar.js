import React from "react";

function Navbar({ onSearch, types, onTypeChange }) {
  const handleInputChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  const handleTypeSelect = (event) => {
    const type = event.target.value;
    onTypeChange(type);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Pokédex
        </a>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Pokémon"
            aria-label="Search"
            onChange={handleInputChange}
          />
          <select className="form-select ms-2" onChange={handleTypeSelect}>
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.english} value={type.english}>
                {type.english}
              </option>
            ))}
          </select>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;

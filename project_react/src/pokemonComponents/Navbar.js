import React from "react";
import { Form, FormControl, Button, Container, Row, Col } from "react-bootstrap";

function Navbar({ onSearch, types, onTypeChange, selectedTypes }) {
  const handleInputChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onTypeChange([...selectedTypes, value]);
    } else {
      onTypeChange(selectedTypes.filter(type => type !== value));
    }
  };

  return (
    <nav className="navbar navbar-light bg-light mb-4">
    <Container>
        <Row className="w-100">
          <Col className="d-flex justify-content-between">
            <a className="navbar-brand pokedex-logo" href="/">Pokédex</a>
            <Form className="d-flex w-75">
              <FormControl
                type="search"
                placeholder="Search Pokémon"
                className="me-2 w-100"
                aria-label="Search"
                onChange={handleInputChange}
              />
            </Form>
          </Col>
        </Row>
      </Container>


      <Container className="mt-4">
        <Row>
          <Col>
            <h5>Select Pokémon Types</h5>
            <div className="d-flex flex-wrap">
              {types.map((type) => (
                <div key={type.english} className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={type.english}
                    onChange={handleTypeChange}
                    checked={selectedTypes.includes(type.english)}
                  />
                  <label className="form-check-label">{type.english}</label>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  );
}

export default Navbar;

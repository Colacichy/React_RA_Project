import React, { useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";

function PokemonCard({ pokemon }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <div className="card shadow-sm" onClick={handleShow} style={{ cursor: "pointer" }}>
        <img
          src={pokemon.image || "https://via.placeholder.com/150"}
          alt={pokemon.name.english}
          className="card-img-top rounded"
        />
        <div className="card-body">
          <h5 className="card-title text-center">{pokemon.name.english}</h5>
          <p className="card-text text-center text-muted">{pokemon.type.join(", ")}</p>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{pokemon.name.english}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-4">
            <Col md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src={pokemon.image || "https://via.placeholder.com/150"}
                  alt={pokemon.name.english}
                  className="rounded mx-auto d-block"
                />
              </Card>
            </Col>
            <Col md={8}>
              <h5>Type: {pokemon.type.join(", ")}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>HP:</strong> {pokemon.base.HP}</li>
                <li className="list-group-item"><strong>Attack:</strong> {pokemon.base.Attack}</li>
                <li className="list-group-item"><strong>Defense:</strong> {pokemon.base.Defense}</li>
                <li className="list-group-item"><strong>Sp. Attack:</strong> {pokemon.base["Sp. Attack"]}</li>
                <li className="list-group-item"><strong>Sp. Defense:</strong> {pokemon.base["Sp. Defense"]}</li>
                <li className="list-group-item"><strong>Speed:</strong> {pokemon.base.Speed}</li>
              </ul>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PokemonCard;

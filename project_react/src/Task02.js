import React, { useState } from "react";
import axios from "axios";

function Task02() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    vanilla: false,
    chocolate: false,
    raspberry: false,
    gender: "Male",
  });

  const [allFormData, setAllFormData] = useState([]);

  const inputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const genderChange = (gender) => {
    setFormData({
      ...formData,
      gender,
    });
  };

  const submitData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/task02/postData", formData)
      .catch((error) => {
        alert("Error", error);
      });
  };

  const fetchData = () => {
    axios
      .get("http://localhost:8080/task02/getData")
      .then((response) => {
        setAllFormData(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form className="m-4" onSubmit={submitData}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={inputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="surname" className="form-label">Surname</label>
          <input
            type="text"
            className="form-control"
            id="surname"
            value={formData.surname}
            onChange={inputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={formData.age}
            onChange={inputChange}
          />
        </div>

        <div className="mb-3 form-check">
          <label class="me-2">
            <input
              type="checkbox"
              id="vanilla"
              checked={formData.vanilla}
              onChange={inputChange}
              class="me-2"
            />
            Vanilla
          </label>
          <label class="me-2">
            <input
              type="checkbox"
              id="chocolate"
              checked={formData.chocolate}
              onChange={inputChange}
              class="me-2"
            />
            Chocolate
          </label>
          <label class="me-2">
            <input
              type="checkbox"
              id="raspberry"
              checked={formData.raspberry}
              onChange={inputChange}
              class="me-2"
            />
            Raspberry
          </label>
        </div>

        <div>
          {["Male", "Female", "Shmetterling"].map((gender) => (
            <div className="form-check" key={gender}>
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id={gender}
                checked={formData.gender === gender}
                onChange={() => genderChange(gender)}
              />
              <label htmlFor={gender} className="form-check-label">{gender}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <button onClick={fetchData} className="btn btn-secondary mt-4">Get Data</button>

      <h2 className="mt-4">Data:</h2>
      <ul>
        {allFormData.map(({ name, surname, age, gender, vanilla, chocolate, raspberry }, index) => (
          <li key={index}>
            <strong>{name} {surname}</strong>, Age: {age}, Gender: {gender}
            <br />
            Taste: {vanilla && "Vanilla "} {chocolate && "Chocolate "} {raspberry && "Raspberry"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Task02;
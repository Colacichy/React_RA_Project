import { useForm } from '@tanstack/react-form';
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchImages = async () => {
  const response = await axios.get("http://localhost:8080/images");
  return response.data;
};

const fetchImage = async (filename) => {
  const response = await axios.get(
    `http://localhost:8080/images?filename=${filename}`,
    {
      responseType: "blob",
    }
  );
  return URL.createObjectURL(response.data);
};

const submitData = async (formData) => {
  console.log(formData);
  await axios.post("http://localhost:8080/submit", formData);
};

const fetchSubmittedData = async () => {
  const response = await axios.get("http://localhost:8080/data");
  return response.data;
};

function RegisterTask() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await submitData(value);
      alert("Dane zostały wysłane!");
    },
    validations: {
      name: (value) => {
        if (!value) return "Imię jest wymagane";
        if (value.length < 3) return "Imię musi mieć co najmniej 3 znaki";
        return undefined;
      },
      email: (value) => {
        if (!value) return "Email jest wymagany";
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) return "Email jest nieprawidłowy";
        return undefined;
      },
      password: (value) => {
        if (!value) return "Hasło jest wymagane";
        if (value.length < 6) return "Hasło musi mieć co najmniej 6 znaków";
        return undefined;
      },
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const imagesPerView = 5;

  const {
    data: imageFiles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  const loadImage = useCallback(
    async (filename) => {
      if (!loadedImages[filename]) {
        setLoading(true);
        const imageUrl = await fetchImage(filename);
        setLoadedImages((prev) => ({ ...prev, [filename]: imageUrl }));
        setLoading(false);
      }
    },
    [loadedImages]
  );

  const prevCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageFiles.length) % imageFiles.length
    );
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageFiles.length);
  };

  const handleFetchData = async () => {
    try {
      const data = await fetchSubmittedData();
      setSubmittedData(data);
    } catch (error) {
      console.error("Błąd pobierania danych", error);
    }
  };

  useEffect(() => {
    if (imageFiles.length > 0) {
      const filesToLoad = [];
      for (let i = 0; i < imagesPerView; i++) {
        const index = (currentIndex + i) % imageFiles.length;
        filesToLoad.push(imageFiles[index]);
      }
      filesToLoad.forEach((file) => loadImage(file));
    }
  }, [imageFiles, currentIndex, loadImage]);

  if (isLoading) return <div>Ładowanie obrazków...</div>;
  if (error) return <div>Błąd ładowania obrazków</div>;

  return (
    <div className="container mt-5">
      <h1>Formularz danych</h1>
      <button onClick={handleFetchData} className="btn btn-primary">
        Pobierz dane
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="mb-3">
          <form.Field name="name">
            {(field) => (
              <>
                <label htmlFor={field.name} className="form-label">
                  Imię
                </label>
                <input
                  type="text"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="form-control"
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <span className="text-danger">
                    {field.state.meta.errors.join(",")}
                  </span>
                ) : null}
              </>
            )}
          </form.Field>
        </div>
        <div className="mb-3">
          <form.Field name="email">
            {(field) => (
              <>
                <label htmlFor={field.name} className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="form-control"
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <span className="text-danger">
                    {field.state.meta.errors.join(",")}
                  </span>
                ) : null}
              </>
            )}
          </form.Field>
        </div>
        <div className="mb-3">
          <form.Field name="password">
            {(field) => (
              <>
                <label htmlFor={field.name} className="form-label">
                  Hasło
                </label>
                <input
                  type="password"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="form-control"
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <span className="text-danger">
                    {field.state.meta.errors.join(",")}
                  </span>
                ) : null}
              </>
            )}
          </form.Field>
        </div>
        <button type="submit" className="btn btn-primary">
          Wyślij dane
        </button>
      </form>

      <h2 className="mt-5">Wysłane dane:</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Imię</th>
            <th scope="col">Email</th>
            <th scope="col">Hasło (zahashowane)</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-5">Galeria Obrazków:</h2>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-secondary"
          onClick={prevCard}
          disabled={loading}
        >
          Previous
        </button>
        <div className="row gx-2 gy-3">
          {Array.from({ length: imagesPerView }).map((_, i) => {
            const index = (currentIndex + i) % imageFiles.length;
            const image = imageFiles[index];

            return (
              <div
                key={index}
                className="col-6 col-sm-4 col-md-3 col-lg-2"
                style={{ opacity: loading ? 0.5 : 1 }}
              >
                <div className="card h-100">
                  {loadedImages[image] ? (
                    <img
                      className="card-img-top"
                      src={loadedImages[image]}
                      alt={`Obrazek ${index + 1}`}
                      style={{ height: "10rem", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="text-center p-3">Ładowanie...</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="btn btn-secondary"
          onClick={nextCard}
          disabled={loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RegisterTask;

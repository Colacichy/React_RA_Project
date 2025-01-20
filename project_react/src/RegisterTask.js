import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchImages = async () => {
  const response = await axios.get('http://localhost:8080/images');
  return response.data;
};

const submitData = async (formData) => {
  await axios.post('http://localhost:8080/submit', formData);
};

const fetchSubmittedData = async () => {
  const response = await axios.get('http://localhost:8080/data');
  return response.data;
};

function RegisterTask() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: imageFiles = [], isLoading, error } = useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
  });

  const mutation = useMutation({
    mutationFn: submitData,
    onSuccess: () => {
      alert('Dane zostały wysłane!');
      queryClient.invalidateQueries(['submittedData']);
    },
  });

  const queryClient = useQueryClient();

  const { data: submittedData = [] } = useQuery({
    queryKey: ['submittedData'],
    queryFn: fetchSubmittedData,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageFiles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imageFiles]);

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageFiles.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageFiles.length) % imageFiles.length);
  };

  if (isLoading) return <div>Loading images...</div>;
  if (error) return <div>Error loading images</div>;

  return (
    <div className="container mt-5">
      <h1>Formularz danych</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Imię</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
            className="form-control"
          />
          {errors.name && <span className="text-danger">To pole jest wymagane</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="form-control"
          />
          {errors.email && <span className="text-danger">To pole jest wymagane</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Hasło</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className="form-control"
          />
          {errors.password && <span className="text-danger">To pole jest wymagane</span>}
        </div>
        <button type="submit" className="btn btn-primary">Wyślij dane</button>
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
        <button className="btn btn-secondary" onClick={prevCard}>Previous</button>
        <div className="card-deck mx-3 d-flex">
          {imageFiles.slice(currentIndex, currentIndex + 5).map((image, index) => (
            <div key={index} className="card" style={{ width: '18rem' }}>
              <img
                className="card-img-top"
                src={`http://localhost:8080/images/${image}`}
                alt={`Obrazek ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button className="btn btn-secondary" onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}

export default RegisterTask;

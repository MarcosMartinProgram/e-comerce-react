import React, { useState, useContext } from 'react';
import { useMutation } from 'react-query';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });
  const { isAuthenticated, userData, isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createCategoryMutation = useMutation((categoryData) =>
    fetch('https://api.escuelajs.co/api/v1/categories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(categoryData),
    }).then((response) => response.json())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCategoryMutation.mutate(formData);
  };
  const isAdminUser = isAdmin(userData);
  
  if (!isAdminUser) {
    return <p>No tienes permisos para crear un producto.</p>;
  }


  return (
    <div>
      <h1>Crear Categoría</h1>
      {createCategoryMutation.isLoading && <Loading />}
      {createCategoryMutation.isSuccess && (
        <p>Categoría creada exitosamente</p>
      )}
      {createCategoryMutation.isError && (
        <p>Error al crear la categoría</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Categoría</button>
      </form>
    </div>
  );
};

export default CreateCategory;

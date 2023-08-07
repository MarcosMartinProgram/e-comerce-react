import React, { useState, useContext } from 'react';
import { useMutation } from 'react-query';
import Loading from '../Loading';
import { AuthContext } from '../../contexts/AuthContext';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: [''],
  });
  const { isAuthenticated, userData, isAdmin } = useContext(AuthContext);

  if (isAuthenticated && userData) {
    const { name, role } = userData;
    console.log(`Nombre de usuario: ${name}`);
    console.log(`Rol de usuario: ${role}`);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createProductMutation = useMutation((productData: typeof formData) =>
    fetch('https://api.escuelajs.co/api/v1/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(productData),
    }).then((response) => response.json())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProductMutation.mutate(formData);
  };

  const isAdminUser = isAdmin(userData);

  if (!isAdminUser) {
    return <p>No tienes permisos para crear un producto.</p>;
  }

  return (
    <div className="form">
      <h1>Crear Producto</h1>
      {createProductMutation.isLoading && <Loading />}
      {createProductMutation.isSuccess && <p>Producto creado exitosamente</p>}
      {createProductMutation.isError && <p>Error al crear el producto</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label>Categoría:</label>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label>Imágenes:</label>
          <input
            type="text"
            name="images"
            value={formData.images[0]}
            onChange={(e) =>
              setFormData({ ...formData, images: [e.target.value] })
            }
          />
        </div>
        <button type="submit" className="btn">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;




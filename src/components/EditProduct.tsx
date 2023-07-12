import React from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Editar producto</h1>
      <p>ID del producto: {id}</p>
      {}
    </div>
  );
};

export default EditProduct;

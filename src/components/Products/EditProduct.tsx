import React, { useState, useEffect, useContext,  } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import { AuthContext } from '../../contexts/AuthContext';



const EditProduct = () => {
  const { id } = useParams<{ id?: string }>();
  const productId = parseInt(id || '', 10);
  
  const [formData, setFormData] = useState<{
    title: string;
    price: number;
    images: string[];
  }>({
    title: '',
    price: 0,
    images: [],
  });
  const { userData, isAdmin } = useContext(AuthContext);

  
  const getProductQuery = useQuery(['product', productId], () =>
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`).then((response) =>
      response.json()
    )
  );

  useEffect(() => {
    if (getProductQuery.isSuccess) {
      const { title, price, images } = getProductQuery.data;
      setFormData({ title, price, images });
    }
  }, [getProductQuery.isSuccess, getProductQuery.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editProductMutation = useMutation((productData: typeof formData) =>
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    }).then((response) => response.json())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editProductMutation.mutate(formData);
  };

  

  if (getProductQuery.isLoading) {
    return <Loading />;
  }

  if (getProductQuery.isError) {
    return <p>Error al cargar el producto</p>;
  }

  if (editProductMutation.isSuccess) {
    return <p>Producto editado exitosamente</p>;
  }

  if (editProductMutation.isError) {
    return <p>Error al editar el producto</p>;
  }
  const isAdminUser = isAdmin(userData);

  if (!isAdminUser) {
    return <p>No tienes permisos para editar este producto.</p>;
  }

  return (
    <div>
      <h1>Editar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imágenes:</label>
          <input
            type="text"
            name="images"
            value={formData.images.join(',')}
            onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',') })}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
        
      </form>
    </div>
  );
};

export default EditProduct;



import React, { useState, useEffect, useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import Loading from '../Loading';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const EditCategory = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = parseInt(id, 10);

  const [formData, setFormData] = useState({
    name: '',
    
  });

  const { isAuthenticated, userData, isAdmin } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editCategoryMutation = useMutation((categoryData) =>
    fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    }).then((response) => response.json())
  );

  const getCategoryQuery = useQuery(['category', categoryId], () =>
    fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`).then(
      (response) => response.json()
    )
  );

  useEffect(() => {
    if (getCategoryQuery.isSuccess) {
      const {name} =getCategoryQuery.data;  
      setFormData({ name });
    }
  }, [getCategoryQuery.isSuccess, getCategoryQuery.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editCategoryMutation.mutate({ name: formData.name });
  };

  

  if (getCategoryQuery.isLoading) {
    return <Loading />;
  }

  if (getCategoryQuery.isError) {
    return <p>Error al cargar la categoria</p>;
  }

  if (editCategoryMutation.isSuccess) {
    return <p>Categoria editada exitosamente</p>;
  }

  if (editCategoryMutation.isError) {
    return <p>Error al editar la categoria </p>;
  }
  const isAdminUser = isAdmin(userData);

  if (!isAdminUser) {
    return <p>No tienes permisos para editar esta categoria.</p>;
  }

  return (
    <div>
      <h1>Editar Categoría</h1>
      {getCategoryQuery.isLoading && <Loading />}
      {getCategoryQuery.isError && <p>Error al cargar la categoría</p>}
      {editCategoryMutation.isLoading && <Loading />}
      {editCategoryMutation.isSuccess && (
        <p>Categoría editada exitosamente</p>
      )}
      {editCategoryMutation.isError && (
        <p>Error al editar la categoría</p>
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
        
        <button type="submit">Guardar Cambios</button>
        
      </form>
    </div>
  );
};

export default EditCategory;

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import { QUERY_KEY_CATEGORIES } from '../../constantes/QueryKey';
import { useQuery, useQueryClient } from 'react-query';
import Loading from '../Loading.tsx';
import Error from '../Error.tsx';
import { AuthContext } from '../../contexts/AuthContext';
import DeleteCategoryButton from './DeleteCategoryButton';

interface Category {
  id: number;
  name: string;
  image: string;
}

const Categories = () => {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: categories, isLoading, isError } = useQuery<Category[]>(QUERY_KEY_CATEGORIES, async () => {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories/');
      const data = await response.json();
      return data;
    
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <Error message={error} />;
  }

  const isAdmin = () => {
    return isAuthenticated && userData?.role === 'admin';
  };

  return (
    <div>
      <h1>Categories</h1>
      {isAdmin() && <Link to="/categories/create">Crear Categoria</Link>}
      <div className="category-list">
        {categories?.map((category) => (
          <div className="category-card" key={category.id}>
            <img src={category.image} alt={category.name} />
            <h2>{category.name}</h2>
            <Link to={`/products?category=${category.name.toLowerCase()}`}>View Products</Link>
            {isAdmin() && (
              <React.Fragment>
                <Link to={`/categories/edit/${category.id}`}>Editar Categoria</Link>
                <DeleteCategoryButton categoryId={category.id} onDelete={() => queryClient.invalidateQueries(QUERY_KEY_CATEGORIES)} />
              </React.Fragment>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;








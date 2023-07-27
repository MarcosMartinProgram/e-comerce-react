import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import {QUERY_KEY_CATEGORIES} from '../../constantes/QueryKey'
import {useQuery} from 'react-query'
import Loading from '../Loading.tsx'
import Error from '../Error.tsx'
import { AuthContext } from '../../contexts/AuthContext';

interface Category {
  id: number;
  name: string;
  image: string;
}

const Categories = () => {
  const { isAuthenticated, userData,  } = useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [error, setError] = useState<string | null>(null);



  const query = useQuery(QUERY_KEY_CATEGORIES, async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories/');
      const data = await response.json();
      setCategories(data);
      
    } catch (error) {
      
      setError("Error al cargar las categorias");
      
    }
  });

  if (query.isLoading) {
    return <Loading />
  }

  if (query.isError && error) {
    return <Error message={error} />
  }

  const isAdmin = () => {
    return isAuthenticated && userData?.role === 'admin';
  };
  

  return (
    <div>
      <h1>Categories</h1>
      {isAdmin() && (
        <Link to="/categories/create">Crear Categoria</Link>
      )}
      <div className="category-list">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <img src={category.image} alt={category.name} />
            <h2>{category.name}</h2>
            <Link to={`/products?category=${category.name.toLowerCase()}`}>
              View Products
            </Link>
            {isAdmin() && (
              <Link to={`/categories/edit/${category.id}`}>Editar Categoria</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;







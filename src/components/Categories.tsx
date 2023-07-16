import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import {QUERY_KEY_CATEGORIES} from '../constantes/QueryKey'
import {useQuery} from 'react-query'
import Loading from './Loading.tsx'
import Error from './Error.tsx'

interface Category {
  id: number;
  name: string;
  image: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  const query = useQuery(QUERY_KEY_CATEGORIES, async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories/');
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error al cargar los personajes");
      setLoading(false);
    }
  });

  if (query.isLoading) {
    return <Loading />
  }

  if (query.isError) {
    return <Error message={error} />
  }

  

  return (
    <div>
      <h1>Categories</h1>
      <div className="category-list">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <img src={category.image} alt={category.name} />
            <h2>{category.name}</h2>
            <Link to={`/products?category=${category.name.toLowerCase()}`}>
              View Products
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;







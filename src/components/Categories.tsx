import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

interface Category {
  id: number;
  name: string;
  image: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories/');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

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







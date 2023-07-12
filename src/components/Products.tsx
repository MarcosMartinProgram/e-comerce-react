import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Products.css';
import { useQuery } from 'react-query';
import { QUERY_KEY_PRODUCTS } from '../constantes/QueryKey';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
}

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(category || '');

  const { data: products, isLoading, isError } = useQuery<Product[]>(QUERY_KEY_PRODUCTS, async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products/');
    const data = await response.json();
    return data;
  });

  const filterProducts = () => {
    if (selectedCategory && products) {
      const filtered = products.filter((product) => product.category.name.toLowerCase() === selectedCategory.toLowerCase());
      return filtered;
    }
    return products;
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <div className="filter-menu">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {Array.from(new Set(products?.map((product) => product.category.name))).map((categoryName) => (
            <option value={categoryName.toLowerCase()} key={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>
      {selectedCategory && <h2>Category: {selectedCategory}</h2>}
      <div className="product-list">
        {filterProducts()?.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.images[0]} alt={product.title} />
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;



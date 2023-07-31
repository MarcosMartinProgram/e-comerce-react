import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Products.css';
import { useQuery } from 'react-query';
import { QUERY_KEY_PRODUCTS } from '../../constantes/QueryKey';
import Loading from '../Loading';
import Error from '../Error';
import { AuthContext } from '../../contexts/AuthContext';
import DeleteButton from './DeleteButton';
import { CartContext } from '../../contexts/CartContext'

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
  quantity:number;
}

const Products = () => {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const { addToCart } = useContext(CartContext);

  const [selectedCategory, setSelectedCategory] = useState<string>(category || '');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [priceRangeFilter, setPriceRangeFilter] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
  
  const [titleFilter, setTitleFilter] = useState<string>('');

  const { data: products, isLoading, isError, refetch } = useQuery<Product[]>(QUERY_KEY_PRODUCTS, async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products/');
    const data = await response.json();
    return data;
  });

  const isAdmin = () => {
    return isAuthenticated && userData?.role === 'admin';
  };

  const filterProducts = () => {
    let filtered = products || [];

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category.name.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (priceFilter) {
      filtered = filtered.filter((product) => product.price === priceFilter);
    }

    if (priceRangeFilter.min !== null && priceRangeFilter.max !== null) {
      filtered = filtered.filter(
        (product) => {
          const minPrice = priceRangeFilter.min;
          const maxPrice = priceRangeFilter.max;
          return minPrice !== null && maxPrice !== null && product.price >= minPrice && product.price <= maxPrice;
        }
      );
    }

    if (titleFilter) {
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(titleFilter.toLowerCase()));
    }

    return filtered;
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    refetch(); 
  }, [selectedCategory, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message="Error al cargar los productos" />;
  }

  const handleDelete = () => {
    refetch();
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  }

  const filteredProducts = filterProducts(); 

  return (
    <div>
      <h1>Products</h1>
      {isAdmin() && (
        <Link to="/products/create">Crear Producto</Link>
      )}
      <div className="filter-menu">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {Array.from(new Set(filteredProducts?.map((product) => product.category.name))).map((categoryName) => (
            <option value={categoryName.toLowerCase()} key={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>
      <input
        type="number"
        placeholder="Price"
        value={priceFilter || ''}
        onChange={(e) => setPriceFilter(e.target.value !== '' ? parseInt(e.target.value, 10) : null)}
      />
      <div>
        <input
          type="number"
          placeholder="Min Price"
          value={priceRangeFilter.min || ''}
          onChange={(e) =>
            setPriceRangeFilter((prev) => ({ ...prev, min: e.target.value !== '' ? parseInt(e.target.value, 10) : null }))
          }
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRangeFilter.max || ''}
          onChange={(e) =>
            setPriceRangeFilter((prev) => ({ ...prev, max: e.target.value !== '' ? parseInt(e.target.value, 10) : null }))
          }
        />
      </div>
      <input
        type="text"
        placeholder="Title"
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
      />
      {selectedCategory && <h2>Category: {selectedCategory}</h2>}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.images[0]} alt={product.title} />
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
            {isAdmin() && (
              <React.Fragment>
                <Link to={`/products/edit/${product.id}`}>Editar Producto</Link>
                <DeleteButton productId={product.id} onDelete={handleDelete} />
              </React.Fragment>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

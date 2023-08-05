import React from 'react';
import { CartContext } from '../../contexts/CartContext';
import './CartDetail.css';
import { Link } from 'react-router-dom';


const CartDetail: React.FC = () => {
  const { cartItems, totalPrice, totalItems, incrementCartItem, removeCartItem, clearCart } = React.useContext(CartContext);
  

  const handleIncrement = (productId: number) => {
    incrementCartItem(productId, 1); 
  };

  const handleDecrement = (productId: number) => {
    incrementCartItem(productId, -1); 
  };
  
  const handleCheckout = () => {
    
    clearCart();
    
  };

  return (
    <div>
      <h2>Detalle de productos</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <h3>Productos en el carrito:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <p>{item.title}</p>
                <p>Cantidad: {item.quantity}</p>
                <button onClick={() => handleIncrement(item.id)}>+1</button>
                <button onClick={() => handleDecrement(item.id)}>-1</button>
                <button onClick={() => removeCartItem(item.id)}>Eliminar</button>
                <p>Precio unitario: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <p>Total de ítems: {totalItems}</p>
          <p>Precio total: ${totalPrice}</p>
          <button onClick={handleCheckout}>
            <Link to="/purchase-success">Finalizar compra</Link>
          </button>
        </div>
      )}
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
};

export default CartDetail;



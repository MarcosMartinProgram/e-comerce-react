import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, userData, logout } = useContext(AuthContext);
  const { totalItems, totalPrice } = useContext(CartContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <img src="./carrito2.png" alt="" />
        <Link className="navbar-brand" to="/">
          Ecommerce
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <>
                {userData?.role === 'admin' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/products/create">
                        Create Product
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/categories/create">
                        Create Category
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <p className="nav-link">Bienvenido {userData?.name}</p>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-cart">
          <Link to="/cart-detail" className="nav-link">
            <div>
              <img
                src="./carrito1.ico"
                alt="Carrito"
                className="cart-icon"
              />
            </div>
            <p className="nav-link-text">Ítems: {totalItems}</p>
            <p className="nav-link-text">Total: ${totalPrice}</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;










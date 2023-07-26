import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState('');

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const { access_token, refresh_token } = data;

      login(access_token, formData.email);
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      setUserName(formData.email);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isAuthenticated) {
    return (
      <div>
        <p>Has iniciado sesión como {userName}</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
};

export default Login;







import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length !== 4) {
      alert('La contraseña debe tener 4 caracteres.');
      return;
    }
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      localStorage.setItem('accessToken', data.access_token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Avatar:</label>
          <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;








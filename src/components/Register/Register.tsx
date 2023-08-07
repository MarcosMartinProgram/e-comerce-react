import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'

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
    <div className='registration-form-container'>
      <div className='registration-form'>
        <h1 className='text-center mb-4'>Registro</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'>Nombre:</label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email'>Correo electrónico:</label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>Contraseña:</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='avatar'>Avatar:</label>
            <input
              type='text'
              className='form-control'
              id='avatar'
              name='avatar'
              value={formData.avatar}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;








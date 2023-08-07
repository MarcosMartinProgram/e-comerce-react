import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext, UserData } from '../contexts/AuthContext';
import './Login.css'

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
      console.log(formData)

      const userData: UserData = {
        id: 0, 
        email: formData.email,
        password: formData.password,
        name: '', 
        role: '', 
        avatar: '', 
      };

      login(access_token, userData);
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
    <div className='login-form-container'>
      <div className='login-form'>
        <h1 className='text-center mb-4'>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
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
          <button type='submit' className='btn btn-primary'>
            Iniciar sesión
          </button>
        </form>
        <p className='text-center mt-3'>
          No tienes una cuenta? <Link to='/register'>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;







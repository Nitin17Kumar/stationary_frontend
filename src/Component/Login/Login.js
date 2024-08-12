import React, { useState } from 'react';
import './Login.css';
import background from '../../assets/background.jpeg'; 
import login from '../../assets/login.jpg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApi from '../../Hooks/useApi';

function Login() {
  const { setIsAuthenticated, setIsAdmin } = useApi();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    console.log(formData);

    try {
      const res = await fetch('https://stationary-backend-dbyz.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token); // Set the token in localStorage
        setIsAdmin(data.isAdmin); // Assuming the response includes an isAdmin field
        setIsAuthenticated(true);
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Login failed. Please try again.');
    }
  }

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={background} alt="Background" className="background-image" />
        <img src={login} alt="Login" className="login-image" />
      </div>
      <div className="login-form">
        <button className="close-button" onClick={() => navigate(-1)}>✕</button>
        <form onSubmit={submitHandler}>
          <legend>Login</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={changeHandler}
            value={formData.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={changeHandler}
            value={formData.password}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

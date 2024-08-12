import React, { useState } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/background.jpeg';
import login from '../../assets/login.jpg';
import useApi from '../../Hooks/useApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const { setIsAdmin, setIsAuthenticated } = useApi();
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

    try {
      const res = await fetch('https://stationary-backend-dbyz.onrender.com/api/admin', {
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
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('isAdmin', data.isAdmin);
        setIsAdmin(true);
        setIsAuthenticated(true);
        console.log(setIsAuthenticated);
        toast.success('Login successful!');
        navigate('/admin/config');
      } else {
        toast.error('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Login failed. Please try again.');
    }
  }

  return (
    <div className="admin-container">
      <div className="image-container">
        <img src={background} alt="Background" className="background-image" />
        <img src={login} alt="Login" className="login-image" />
      </div>
      <div className="admin-form">
        <form onSubmit={submitHandler}>
          <button className="close-button" onClick={() => navigate(-1)}>✕</button>
          <legend>ADMIN PANEL</legend>
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

export default Admin;

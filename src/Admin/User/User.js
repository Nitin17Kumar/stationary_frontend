import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import './User.css';
import axios from 'axios';

function USER() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
    password: '',
    isAdmin: false
  });
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  function changeHandler(event) {
    const { name, value, type, files } = event.target;
    const updatedValue = type === 'file' ? files[0] : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  }

  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };

  async function submitHandler(event) {
    event.preventDefault();

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append('image', formData.image);

      try {
        const res = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data.imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    const imageUrl = await uploadImage();

    try {
      const res = await fetch('https://stationary-backend-dbyz.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          image: imageUrl, // Use the Cloudinary image URL
          password: formData.password,
          isAdmin: formData.isAdmin
        })
      });

      if (!res.ok) {
        throw new Error('Signup failed');
      }

      const result = await res.json();
      console.log(result);
      navigate('/login'); // Redirect to login page or another appropriate page
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="config-container">
        <nav className="config-nav">
          <button onClick={() => navigate('/admin/config')}>Config</button>
          <button onClick={() => navigate('/admin/analysis')}>Analysis</button>
          <button onClick={() => navigate('/admin/users')}>Users</button>
        </nav>
        <div className="user-container">
          <div className="user-form">
          <form onSubmit={submitHandler}>
            <legend>ADD USER</legend>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={changeHandler}
              value={formData.name}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={changeHandler}
              value={formData.email}
            />

            <label htmlFor="image">Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required />

            {backgroundImageUrl && (
              <div style={{ backgroundImage: `url(${backgroundImageUrl})`, height: '200px', width: '200px' }}>
                <p>Background Image Set!</p>
              </div>
            )}
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
      </div>
      <Footer />
    </div>
  );
}

export default USER;

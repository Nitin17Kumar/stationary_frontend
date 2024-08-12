import React, { useState } from 'react';
import './Signup.css';
import background from '../../assets/background.jpeg';
import login from '../../assets/login.jpg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
    password: '',
    isAdmin: false,
  });
  const [imagePreview, setImagePreview] = useState(null);

  function changeHandler(event) {
    const { name, value, type, files } = event.target;
    const updatedValue = type === 'file' ? files[0] : value;
  
    if (type === 'file') {
      const imageURL = URL.createObjectURL(updatedValue);
      setImagePreview(imageURL);
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  }
  

  async function submitHandler(event) {
    event.preventDefault();
  
    try {
  
      const res = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success('Signup successful');
        navigate('/login');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Signup failed. Please try again.');
    }
  }
  
  

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <img src={background} alt="Background" className="background-image" />
        <img src={login} alt="Login" className="login-image" />
        <div className="signup-form">
          <button className="close-button" onClick={() => navigate(-1)}>✕</button>
          <form onSubmit={submitHandler}>
            <legend>Sign Up</legend>

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
            <input
              type="file"
              accept="image/*"
              name="image"
              required
              onChange={changeHandler}
            />

            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
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
  );
}

export default Signup;

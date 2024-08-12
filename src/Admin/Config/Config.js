import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import './Config.css';

function Config() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    image: null,
    detail: '',
    quantity: '',
  });

  function changeHandler(event) {
    const { name, value, type, files } = event.target;
    const updatedValue = type === 'file' ? files[0] : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    

    try {
      const res = await fetch('https://stationary-backend-dbyz.onrender.com/api/admin/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: formData.product_name,
          price: formData.price,
          image: formData.image,
          quantity: formData.quantity,
          detail:formData.detail
        })
      });const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <Navbar setIsAdmin={true} setIsAuthenticated={true}/>
      <div className="config-container">
        <nav className="config-nav">
          <button onClick={() => navigate('/admin/config')}>Config</button>
          <button onClick={() => navigate('/admin/analysis')}>Analysis</button>
          <button onClick={() => navigate('/admin/user')}>Users</button>
        </nav>
        <div className="signup-container">
          <div className="signup-form">
            <form onSubmit={submitHandler}>
              <legend>Add Item</legend>
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                name="product_name"
                required
                onChange={changeHandler}
                value={formData.product_name}
              />
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                required
                onChange={changeHandler}
                value={formData.price}
              />
              <label htmlFor="detail">Detail</label>
              <input
                type="text"
                name="detail"
                required
                onChange={changeHandler}
                value={formData.detail}
              />
              <label htmlFor="image">Image</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                required
                onChange={changeHandler}
              />
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="image-preview"
                />
              )}
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                name="quantity"
                required
                onChange={changeHandler}
                value={formData.quantity}
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

export default Config;

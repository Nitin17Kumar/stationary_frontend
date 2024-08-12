import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewCards from '../ReviewCards/ReviewCards';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Detail.css'; // Import the CSS file for styling

function Detail() {
  const location = useLocation();
  const { data: Data } = location.state; // Handle default values for destructuring
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [card, setCard] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: ''
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        review: formData.review,
        product_name: Data.product_name, // Assuming Data.product_name is available
      }),
    };

    try {
      const res = await fetch('https://stationary-backend-dbyz.onrender.com/api/addReview', options);
      if (!res.ok) {
        throw new Error('Failed to add review');
      }
      const detail = await res.json();
      console.log('Review added successfully:', detail);
      setFormData({
        name: '',
        email: '',
        review: ''
      });
      setCard(true);
      toast.success('Review added successfully!'); // Show success toast
    } catch (error) {
      console.error('Error adding review:', error.message);
      toast.error('Failed to add review. Please try again.'); // Show error toast
    }
  };

  return (
    <div>
      <Navbar />
      <div className="card-data">
        <div className="card-info">
          <img src={Data.image} alt="Product" className="product-image" />
        </div>
        <div className="product-details">
          <div className="product-info">Product Name: {Data.product_name}</div>
          <div>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
          <div className="product-info">Price: ₹{Data.price}</div>
          <div className="product-info">Quantity: {Data.quantity}</div>
          <div className="product-summary">{Data.detail}</div>
        </div>
      </div>
          <ReviewCards Data={Data} setCard={setCard}/>
      <div className="review-form">
        <h2 className="section-title">Add Review</h2>
        <form onSubmit={submitHandler} className="form">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input
            type="text"
            name="name"
            required
            onChange={changeHandler}
            value={formData.name}
            className="form-input"
          />

          <label htmlFor="email" className="form-label">Your Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={changeHandler}
            value={formData.email}
            className="form-input"
          />

          <label htmlFor="review" className="form-label">Your Review</label>
          <textarea
            name="review"
            rows="4"
            required
            onChange={changeHandler}
            value={formData.review}
            className="form-textarea"
          ></textarea>

          <button type="submit" className="form-button">Submit Review</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;

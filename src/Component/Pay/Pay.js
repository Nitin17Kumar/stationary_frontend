import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Pay.css'; // Import the CSS file

function Pay() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    add: ''
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

    // Simulate payment processing logic here
    try {
      // Additional form submission logic
      toast.success('Payment method chosen: Pay on Delivery');

      // Clear form data
      setFormData({ add: '' });

      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Error during payment:', error);
      toast.error('Payment failed. Please try again.');
    }
  }

  return (
    <div className="pay-container">
      <p className="pay-header">PAY ON DELIVERY</p>
      <form onSubmit={submitHandler} className="pay-form">
        <label htmlFor="address" className="pay-label">Address</label>
        <input
          type="text"
          name="add"
          required
          onChange={changeHandler}
          value={formData.add}
          className="pay-input"
        />
        <button type="submit" className="pay-button">PAY ON DELIVERY</button>
      </form>
    </div>
  );
}

export default Pay;

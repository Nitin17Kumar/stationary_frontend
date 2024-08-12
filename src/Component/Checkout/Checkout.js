import React, { useState } from 'react';
import './Checkout.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { MdShoppingCartCheckout } from "react-icons/md";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [addData, setAddData] = useState(location.state ? location.state.addData : []);

  const calculateTotal = () => {
    return addData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleRemoveItem = (itemId) => {
    const updatedData = addData.filter(item => item.id !== itemId);
    setAddData(updatedData);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedData = addData.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setAddData(updatedData);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedData = addData.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setAddData(updatedData);
  };

  const handleProceedToCheckout = () => {
    navigate("/pay", { state: { addData: addData } });
  };

  return (
    <div>
      <Navbar />
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div className="checkout-items">
          {addData.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            addData.map(item => (
              <div key={item.id} className="checkout-item">
                <div className="item-image">
                  <img src={item.image} alt={item.product_name} />
                </div>
                <div className="item-details">
                  <div className="item-info">Product: {item.product_name}</div>
                  <div className="item-info">Price: ₹{item.price}</div>
                  <div className="item-info">Quantity: {item.quantity}</div>
                  <button className="quantity-button" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  <button className="quantity-button" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="total-section">
          <h3>Total:</h3>
          <p>₹{calculateTotal()}</p>
        </div>
        <button className="checkout-button" onClick={handleProceedToCheckout}>
          <MdShoppingCartCheckout /> Proceed to Checkout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;

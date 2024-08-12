import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css'; // Import CSS for styling

function Card({ data, addData = [], setAddData }) { // Ensure addData has a default value
  const navigate = useNavigate();

  const addToCart = () => {
    const itemIndex = addData.findIndex(item => item.id === data.id);

    if (itemIndex !== -1) {
      const updatedData = [...addData];
      updatedData[itemIndex].quantity += 1;
      setAddData(updatedData);
    } else {
      setAddData(prevAddData => [...prevAddData, { ...data, quantity: 1 }]);
    }
  };
    navigate(`/checkout`, { state: { addData: [...addData, { ...data, quantity: 1 }] } });
  const handleDetail = () => {
    if (data.product_name) {
      navigate(`/detail/${data.product_name}`, { state: { data: data } });
    } else {
      navigate('/details/undefined');
    }
  };

  return (
    <div className="card">
      <div className="card-image" onClick={handleDetail}>
        <img src={data.image} alt={data.product_name} />
      </div>
      <div className="card-details" onClick={handleDetail}>
        <div className="card-info">Product Name: {data.product_name}</div>
        <div className="card-info">Price: ₹{data.price}</div>
        <div className="card-info">Available Quantity: {data.quantity}</div>
        <div className="card-summary">{data.summary}</div>
      </div>
      <button className="add-to-cart-button" onClick={addToCart}>
        Add To Cart
      </button>
    </div>
  );
}

export default Card;

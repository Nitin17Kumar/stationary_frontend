// ReviewCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewCard.css'; // Import the CSS file for styling

function ReviewCard(props) {
  const { data, image,setCard } = props;
  const navigate = useNavigate();
  setCard(true);
  function handleDetail() {
    if (data.product_name) {
      navigate(`/detail/${data.product_name}`, { state: { data: data } });
    } else {
      navigate('/details/undefined');
    }
  }

  return (
    <div className="card" onClick={handleDetail}>
      
      <div className="card-image">
        <img src={image} alt="Product" />
      </div>
      <div className="card-details">
        <div className="card-info">Product Name: {data.product_name}</div>
        <div className="card-info">Email: {data.email}</div>
        <div className="card-info">Name: {data.name}</div>
        <div className="card-summary">"{data.review}"</div>
      </div>
    </div>
  );
}

export default ReviewCard;

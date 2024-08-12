// ReviewCards.jsx
import React, { useEffect, useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import './ReviewCards.css'; // Import the CSS file for styling
function ReviewCards(props) {
  const Data = props.Data; 
  const [card,setCard] = useState(false);
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const productNameFilter = Data.product_name; // Set the product name filter to 'pencil'
  

  // Fetch data from API
  async function fetchApi() {
    try {
      const res = await fetch('https://stationary-backend-dbyz.onrender.com/api/reviewAll', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const apiData = await res.json();
      setDatas(apiData.data);
      
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  // Filter data based on product name
  useEffect(() => {
    const filteredData = datas.filter(data =>
      data.product_name.toLowerCase().includes(productNameFilter.toLowerCase())
    );
    setFilteredData(filteredData);
  }, [datas, productNameFilter]);

  return (
    <div >
      {card && (<div className="reviews-section">
        <h2 className="section-title">Reviews </h2>
      </div>)}
      <div className="cards-container">
      {filteredData.map((data) => (
        <ReviewCard key={data.id} data={data} image={Data.image} setCard={setCard}/>
      ))}
      </div>
    </div>
  );
}

export default ReviewCards;

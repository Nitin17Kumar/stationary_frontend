import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Cards.css'; // Import CSS for styling
import { useLocation } from 'react-router-dom';
import useApi from '../../Hooks/useApi';

function Cards() {
  const [store, setStore] = useState([]);
  const { addData, setAddData } = useApi();
  const location = useLocation();
  const searchParams = location.state?.search;

  async function fetchApi() {
    try {
      let apiUrl = 'https://stationary-backend-dbyz.onrender.com/api/all';

      // Check if there is a search state in location
      if (searchParams && searchParams.searchValue) {
        const { searchBy, searchValue } = searchParams;
        apiUrl = `https://stationary-backend-dbyz.onrender.com/api/filter?${searchBy}=${searchValue}`;
      }

      const res = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          // You can add other headers here if necessary
        },
      });
      const apiData = await res.json();
      setStore(apiData.data);
      console.log(apiData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [searchParams]); // Add searchParams as a dependency to refetch when it changes

  return (
    <div className="cards-container">
      {store.map((data, index) => (
        <Card key={index} data={data} addData={addData} setAddData={setAddData}/>
      ))}
    </div>
  );
}

export default Cards;

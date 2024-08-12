import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import './Home.css'; // Import CSS for styling
import useApi from '../../Hooks/useApi';

function Home() {
  const {login, setLogin} = useApi();
  const [currentIndex, setCurrentIndex] = useState(0);

  // List of image URLs
  const images = [
    'https://t3.ftcdn.net/jpg/05/11/01/02/360_F_511010254_pVaBHjs5DooDMPkCPrC4Pw2C39cfhyOa.jpg',
    'https://imgmedia.lbb.in/media/2021/03/604af35bf9e6694e5d32d061_1615524699384.jpg',
    'https://content3.jdmagicbox.com/comp/lucknow/k7/0522px522.x522.130130163351.x2k7/catalogue/balaji-stationery-gomti-nagar-lucknow-stationery-shops-vdjrp5m4e6.jpg'
  ];

  // Function to move to the next image
  const moveNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to move to the previous image
  const movePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(moveNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <Navbar login={login} setLogin={setLogin} />
      <div className="home-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Img${index + 1}`}
            className={`home-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
        <div className="nav-buttons">
          <button className="nav-button" onClick={movePrev}>&#10094;</button>
          <button className="nav-button" onClick={moveNext}>&#10095;</button>
        </div>
      </div>
      <br></br>
      <p className="cards-heading">Best Study Material</p>
      <br></br>
      <Cards className='cards'/>
      <Footer />
    </div>
  );
}

export default Home;

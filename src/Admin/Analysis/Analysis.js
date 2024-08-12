import React from 'react';
import Footer from '../../Component/Footer/Footer';
import Navbar from '../../Component/Navbar/Navbar'
import 'chart.js/auto';
import { Doughnut , Bar} from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import './Analysis.css';
import { useNavigate } from 'react-router-dom';

function Analysis() {
  const [Details, setDetails] = useState([]);
  const navigate = useNavigate();

  async function fetchApi() {
    try {
      const res = await fetch('https://stationary-backend-dbyz.onrender.com/api/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const apiData = await res.json();
      setDetails(apiData.data);
      console.log(apiData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (Details && Details.length > 0) {
      const intensityByCountry = {};
      Details.forEach((detail) => {
        const country = detail.product_name;
        const intensity = detail.price || 0;

        if (!intensityByCountry[country]) {
          intensityByCountry[country] = 0;
        }

        intensityByCountry[country] += intensity;
      });

      const labels = Object.keys(intensityByCountry);
      const intensities = Object.values(intensityByCountry);
      const backgroundColors = intensities.map((_, index) => getColor(index));

      const data = {
        labels: labels,
        datasets: [{
          label: 'Product Intensity',
          backgroundColor: backgroundColors,
          borderWidth: 1,
          data: intensities,
        }],
      };

      setChartData(data);
    }
  }, [Details]);

  function getColor(index) {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
      '#FF5733', '#34A23E', '#FFCE45', '#4BCCC0', '#99A6FF', '#FF9F40'
    ];
    return colors[index % colors.length];
  }

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            const percentage = ((value / chartData.datasets[0].data.reduce((acc, val) => acc + val, 0)) * 100).toFixed(2);
            return `${label}: ₹${value} `;
          },
        },
      },
    },
  };



  if (!Array.isArray(Details) || Details.length === 0) {
    return <div></div>;
  }

  const generateColors = (count) => {
    const colors = [];
    const baseColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
      '#FF5733', '#34A23E', '#FFCE45', '#4BCCC0', '#99A6FF', '#FF9F40'
    ];
    for (let i = 0; i < count; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
  };

  const data = {
    labels: Details.map((Detail) => Detail.product_name || 'Unknown'),
    datasets: [
      {
        label: "Quantity",
        backgroundColor: generateColors(Details.length),
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: Details.map((Detail) => Detail.quantity),
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <br></br>
      <nav className="config-nav">
          <button onClick={() => navigate('/admin/config')}>Config</button>
          <button onClick={() => navigate('/admin/analysis')}>Analysis</button>
          <button onClick={() => navigate('/admin/user')}>Users</button>
        </nav>
      <div className="analysis-container">
        <div className="country-container">
          <h2>Data in graphical way</h2>
          <div className="chart-card">
            <div className="chart-container">
              {chartData ? <Doughnut data={chartData} options={options} /> : <div>Loading...</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="intensity-container">
      <div>
        {Array.isArray(Details) ? (
          Details.forEach((detail, index) => (
            <div key={index}>
              <p>{detail.name}</p>
            </div>
          ))
        ) : (
          <p>No details available.</p>
        )}
      </div>
      <div className="chart-card">
        <div className="chart-container">
          <Bar data={data} />
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Analysis;

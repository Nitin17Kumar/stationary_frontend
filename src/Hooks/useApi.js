import React, { useState, useEffect } from 'react';

const useApi = () => {
  const [data, setData] = useState([]);
  const [login, setLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [addData, setAddData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (token) {
      setIsAuthenticated(true);
    }
    if (isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  async function apiData(Api) {
    try {
      const res = await fetch(Api);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return {
    data,
    setData,
    login,
    setLogin,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
    addData,
    setAddData
  };
};

export default useApi;

import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Navbar.css';
import useApi from '../../Hooks/useApi';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

function Navbar() {
  const { addData, isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin } = useApi();
  const [search, setSearch] = useState({ searchBy: 'product_name', searchValue: '' });
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    navigate('/', { state: { search } });
  };

  const logIn = () => {
    navigate('/login');
  };

  const signUp = () => {
    navigate('/signup');
  };

  const logOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div>
        <NavLink to='/' className='navbar-logo'>STATIONARY</NavLink>
      </div>
      <form onSubmit={submitHandler} className="navbar-form">
        <select
          name="searchBy"
          onChange={changeHandler}
          value={search.searchBy}
          className="navbar-select"
        >
          <option value="product_name">Product Name</option>
          <option value="price">Price</option>
          <option value="detail">Detail</option>
          <option value="quantity">Quantity</option>
        </select>
        <input
          type="text"
          onChange={changeHandler}
          name='searchValue'
          id='search'
          placeholder='Search'
          value={search.searchValue}
          className="navbar-search"
        />
      </form>
      {isAuthenticated && (
        <div className="auth-buttons">
          <button onClick={() => navigate('/checkout', { state: { addData } })} >
            <FaShoppingCart /> Cart
          </button>
        </div>
      )}
      {isAuthenticated ? (
        <div className="auth-buttons">
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button onClick={logIn}><IoIosLogIn /> Login</button>
          <button onClick={signUp}><FaRegUser /> Signup</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

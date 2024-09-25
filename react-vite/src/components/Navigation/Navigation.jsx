import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import coffeeCup from '/coffeeCup.jpg';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { GiCoffeeBeans, GiCoffeePot } from "react-icons/gi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  const navigate = useNavigate();
  return (
    <div className='nav-bar-the-real-bar'>
      <div className="nav-bar-left-side" onClick={() => navigate('/')}>
        <img src={coffeeCup} className="nav-bar-icon" />
        <h1>Flask of Joe</h1>
      </div>

      <div className="nav-bar-search-container">
        <input type="text" className="nav-bar-search-input" placeholder="Feature coming soon..." />
        <button className="nav-bar-search-icon">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <div className="nav-bar-right-side">
        <div className="no-bullets-li">
          <li onClick={() => navigate('/form')}>
            <NavLink to="/form" className='no-text-style'>New </NavLink>
            <GiCoffeeBeans />
          </li>
          <li onClick={() => navigate('/users-coffee')}>
            <NavLink to="/users-coffee" className='no-text-style'>Manage </NavLink>
            <GiCoffeePot />
          </li>
          <li>
            <FaHeart onClick={() => navigate('/favorites')} className='no-text-style' />
          </li>
          <li className="nav-profile-button">
            <ProfileButton />
          </li>
          <li onClick={() => navigate('/cart')}>
            <FaCartShopping />
          </li>
        </div>
      </div>
    </div>
  );
}

export default Navigation;

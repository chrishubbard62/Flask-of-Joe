import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import coffeeCup from '/coffeeCup.jpg';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { GiCoffeeBeans, GiCoffeePot } from "react-icons/gi";

function Navigation() {
  const navigate = useNavigate();
  return (
    <div className='nav-bar-the-real-bar'>
      <div className="nav-bar-left-side" onClick={() => navigate('/')}>
        <img src={coffeeCup} className="nav-bar-icon" />
        <p>Flask of Joe</p>
      </div>
      <div className="nav-bar-right-side">
        <div className="no-bullets-li">
          <li onClick={() => navigate('/coffees/new')}>
            <NavLink to="/form" className='no-text-style'>new </NavLink>
            <GiCoffeeBeans />
          </li>
          <li onClick={() => navigate('/users-coffee')}>
            <NavLink to="/users-coffee" className='no-text-style'>manage </NavLink>
            <GiCoffeePot />
          </li>
          <li>
            <FaHeart onClick={() => navigate('/favorites')} className='no-text-style' />
          </li>
          <li>
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

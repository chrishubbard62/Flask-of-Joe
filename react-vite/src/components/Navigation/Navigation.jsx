import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import coffeeCup from '/coffeeCup.jpg';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { GiCoffeeBeans } from "react-icons/gi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

function Navigation() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.session.user);

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

      <div className="nav-bar-new-block">
        {user &&
          (<div onClick={() => navigate('/coffees/new')} className="nav-bar-new-img-text">
            <NavLink to="/coffees/new" className='no-text-style nav-bar-new-text'> Create New </NavLink>
            <GiCoffeeBeans className="nav-bar-icons" />
          </div>)}
      </div>

      <div className="nav-bar-right-side">
        <div className="no-bullets-li">
          {user && 
          (<li>
            <FaHeart onClick={() => navigate('/favorites')} className='no-text-style nav-bar-icons nav-bar-heart-icon' />
          </li>)}

          <li className="nav-profile-button">
            <ProfileButton className="nav-bar-icons" />
          </li>

          {user && 
          (<li onClick={() => navigate('/cart')}>
            <FaCartShopping className="nav-bar-icons" />
          </li>)}
        </div>
      </div>
    </div>
  );
}

export default Navigation;

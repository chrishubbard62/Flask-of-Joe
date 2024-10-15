import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import coffeeCup from '/coffeeCup.jpg';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";

function Navigation() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.session.user);

  return (
    <div className='nav-bar-the-real-bar'>
      <div className="nav-bar-inside-block">
        <div className="nav-bar-left-side" onClick={() => navigate('/')}>
          <img src={coffeeCup} className="nav-bar-icon" />
          <h1>Flask of Joe</h1>
        </div>

        <div className="nav-bar-right-side">
          <div className="no-bullets-li">
            {user &&
              (<li>
                <button className="nav-bar-icon-buttons">
                  <FaHeart onClick={() => navigate('/favorites')}     className='no-text-style nav-bar-icons nav-bar-heart-icon' />
                </button>

              </li>)}

            <li className="nav-profile-button">
                <ProfileButton className="nav-bar-icons" />
            </li>

            {user &&
              (<li onClick={() => navigate('/cart')}>
                <button className="nav-bar-icon-buttons">
                  <FaCartShopping className="nav-bar-icons" id='nav-bar-cart-icon' />
                </button>
              </li>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;

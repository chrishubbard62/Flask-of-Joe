import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { GiCoffeePot, GiCoffeeBeans } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";


function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout())
      .then(navigate('/'))

    closeMenu();
  };

  return (
    <div className="button-wrapper">
      <button onClick={toggleMenu} className="nav-bar-profile-button nav-bar-icons nav-bar-icon-buttons">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="user-drop-down no-bullets-li">
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li onClick={() => navigate('/users-coffee')}>
                <NavLink to="/users-coffee" className='no-text-style'>Manage Coffee </NavLink>
                <GiCoffeePot />
              </li>
              <li onClick={() => navigate('/coffees/new')} className="nav-bar-new-img-text">
                <NavLink to="/coffees/new" className='no-text-style nav-bar-new-text'> Create New </NavLink>
                <GiCoffeeBeans />
              </li>
              <li>
                <button onClick={logout} className="profile-drop-down-logout">Log Out</button>
              </li>
            </div>
          ) : (
            <div className="user-drop-down no-bullets-li profile-drop-down-login-signup">
              <OpenModalMenuItem
                modalClassName="profile-login-modal"
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                modalClassName="profile-signup-modal"
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;

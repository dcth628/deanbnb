import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import DemoUserLogIn from "../DemoUser";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='header-profile-button' onClick={openMenu}>
      <i className="fas fa-bars fa-user-circle"  />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>{user.username}</div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
            <div>
              <NavLink className="profile-manage" to='/spots/current'>Manage Your Spots</NavLink>
            </div>
            <div>
              <button className="log-out" onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
          <div className="profile-no-user profile-action">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </div>
          <div className="profile-no-user profile-action">
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
          <div className="profile-no-user">
            <DemoUserLogIn />
          </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;

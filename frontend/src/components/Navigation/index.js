import React, { useState, useEffect, useRef } from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreateSpotForm from '../SpotCreate';
// import Fab from '../Fab';import
import OpenModalMenuItem from './OpenModalMenuItem';
import airbnblogog from './airbnblogo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  // const [showForm, setShowForm ] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

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

  return (
    <div className='header'>
      <>

      <div className='header-home'>
        <a href="/"><img className='home-logo' src={airbnblogog} alt={airbnblogog}></img> </a>
      </div>
      <div className='header-create-spot'>
        { sessionUser ?
        <div className='create-spot-link'>
          <OpenModalMenuItem
            itemText="Create New Spot"
            onItemClick={closeMenu}
            modalComponent={<CreateSpotForm />}
          />
        </div>
        :
        <></>
        }
      </div>
      </>
      {isLoaded && (
        <div className='header-profile-button'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal/LoginFormModal';
// // import * as sessionActions from '../../store/session';
// import './Navigation.css';
// import SignupFormModal from '../SignupFormModal/SignupFormModal';

// const Navigation = ({isLoaded}) => {
//     const sessionUser = useSelector(state => state.session.user);

//     let sessionLinks;
//     if (sessionUser) {
//       sessionLinks = (
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//       );
//     } else {
//       sessionLinks = (
//         <li>
//           <OpenModalButton
//           buttonText='Log In'
//           modalComponent={<LoginFormModal />}
//           />
//           <OpenModalButton
//           buttonText='Sign Up'
//           modalComponent={<SignupFormModal />}
//           />
//         </li>
//       );
//     }
//     // // const dispatch = useDispatch();

//     // // const logout = (e) => {
//     // //     e.preventDefault();
//     // //     dispatch(sessionActions.logout());
//     // // };

//     // let sessionLinks;
//     // if (sessionUser) {
//     //   sessionLinks = (
//     //     <li>
//     //       <ProfileButton user={sessionUser} />
//     //     </li>
//     //   );
//     // } else {
//     //   sessionLinks = (
//     //     <li>
//     //       <NavLink to="/login">Log In</NavLink>
//     //       <NavLink to="/signup">Sign Up</NavLink>
//     //     </li>
//     //   );
//     // }

//     // return (
//     //   <ul>
//     //     <li>
//     //       <NavLink exact to="/">Home</NavLink>
//     //     </li>
//     //     {isLoaded && sessionLinks}
//     //   </ul>
//     // );

//     return (
//       <ul>
//         <li>
//           <NavLink exact to="/">Home</NavLink>
//         </li>
//         {isLoaded && sessionLinks}
//       </ul>
//     );
// };

// export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
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

import { Link, Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);

//   const handleLogin = () => {
//     // Perform login logic
//     setLoggedIn(true);
//   };

  const handleLogout = () => {
    // Perform logout logic
    setLoggedIn(false);
  };

  return (
    <div className='navbar'>
      <nav>
        <Link to={'/'}>home</Link>
        <Link to='/events'>events</Link>
        <NavLink to='/register' >
          Register
        </NavLink>
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to='/login' >
            Login
          </NavLink>
        )}
      </nav>
      <Outlet />
    </div>
  );
}
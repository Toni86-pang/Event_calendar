/* eslint-disable indent */
import './navbar.css'
import { Link, Outlet} from 'react-router-dom'
import { useState } from 'react'

export default function Nav() {
	const [loggedIn, setLoggedIn] = useState(false)
	
	const handleLogout = () => {
		setLoggedIn(false)
	}

	return (
		<div className='navbar'>
			<nav>
				<Link className='link' to={'/'}>Home</Link>
				<Link className='link' to='/events'>Events</Link>
				<Link className='link' to='/register'>Register</Link>
				{loggedIn ? <button onClick={handleLogout}>Logout</button>
									: <Link className='link' to='/login'>Login</Link>
				}
			</nav>
			<Outlet context={setLoggedIn}/>
		</div>
	)
}
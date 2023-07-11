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
		<div className='body'>
			<nav>
				<Link className='link' to='/'>Home</Link>
				<Link className='link' to='/events'>Events</Link>
				<Link className='link' to='/register'>Register</Link>
				{loggedIn ? <Link className='link' to='/' onClick={handleLogout}>Logout</Link>
									: <Link className='link' to='/login'>Login</Link>
				}
			</nav>
			<img className='construct' src='./src/img/pngwing.com.png' />
			<Outlet context={setLoggedIn}/>
		</div>
	)
}
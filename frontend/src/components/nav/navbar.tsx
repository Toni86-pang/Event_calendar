/* eslint-disable indent */
import './navbar.css'
import { Link, Outlet} from 'react-router-dom'
import { useState } from 'react'

export default function Nav() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [userId, setUserId] = useState<number|null>(null)
	
	const handleLogout = () => {
		setLoggedIn(false)
		setUserId(null)
		localStorage.clear()
	}
	return (
		<div className='body'>
			<nav>
				{/* <Link className='navLink' to='/'><button>Home</button></Link> */}
				<Link className='navLink' to='/events' state={{userId}}><button>Events</button></Link>
				{loggedIn && <Link className='navLink' to='/events/create' state={{userId:-1}}><button>New event</button></Link> }
				{!loggedIn&&<Link className='navLink' to='/register'><button>Register</button></Link>}
				{loggedIn ? <Link className='navLink' to='/' onClick={handleLogout}><button>Logout</button></Link>
									: <Link className='navLink' to='/login'><button>Login</button></Link>
				}
			</nav>
			<Outlet context={{setLoggedIn, setUserId}}/>
		</div>
	)
}
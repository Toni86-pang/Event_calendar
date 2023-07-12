/* eslint-disable indent */
import './navbar.css'
import { Link, Outlet} from 'react-router-dom'
import { useState } from 'react'

export default function Nav() {
	const [loggedIn, setLoggedIn] = useState(false)
	
	const handleLogout = () => {
		setLoggedIn(false)
		localStorage.clear()
	}

	return (
		<div className='body'>
			<nav>
				<Link className='link' to='/'><button>Home</button></Link>
				<Link className='link' to='/events'><button>Events</button></Link>
				{loggedIn && <Link className='link' to='/events/create'><button>New event</button></Link> }
				<Link className='link' to='/register'><button>Register</button></Link>
				{loggedIn ? <Link className='link' to='/' onClick={handleLogout}><button>Logout</button></Link>
									: <Link className='link' to='/login'><button>Login</button></Link>
				}
			</nav>
			<Outlet context={setLoggedIn}/>
		</div>
	)
}
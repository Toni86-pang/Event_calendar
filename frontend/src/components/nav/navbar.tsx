/* eslint-disable indent */
import './navbar.css'
import { Link, Outlet, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Nav() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [userId, setUserId] = useState<number|null>(null)
	
  console.log(loggedIn)
  useEffect(() => {
    
      if(localStorage.getItem('token')) setLoggedIn(true)
      console.log(loggedIn)

  }, [])

  const navigate = useNavigate()

  useEffect(() => {
	if(!loggedIn) localStorage.clear()
  },[loggedIn])

  const handleDelete = async () => {
    
    try {
       await fetch('/api/users/delete', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
     
    } catch (error) {
      console.log('Error deleting user:', error)
    }
    
    setLoggedIn(false)
		setUserId(null)
		localStorage.clear()

    navigate('/events')
  }

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

				{loggedIn ? <Link className='navLink' to='/events'><button onClick={handleDelete}>Delete User</button></Link> 
                  : <Link className='navLink' to='/register'><button>Register</button></Link>
        }
				{loggedIn ? <Link className='navLink' to='/' onClick={handleLogout}><button>Logout</button></Link>
									: <Link className='navLink' to='/login'><button>Login</button></Link>
				}
			</nav>
			<Outlet context={{setLoggedIn, setUserId, loggedIn}}/>
		</div>
	)
}
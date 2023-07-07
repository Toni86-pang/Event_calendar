import {Link, Outlet } from 'react-router-dom'


export default function Nav() {

return <div className='navbar'>
<nav>
<Link to={'./1'}><button></button></Link>
<Link to={'./2'}><button></button></Link>
<Link to={'./1'}><button></button></Link>
</nav>


<Outlet />
</div>

}



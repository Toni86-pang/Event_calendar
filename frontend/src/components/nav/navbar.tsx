import {Link, Outlet } from 'react-router-dom'


export default function Nav() {

return <div className='navbar'>
<nav>
<Link to={'./1'}></Link>
<Link to={'./2'}></Link>
<Link to={'./1'}></Link>
</nav>


<Outlet />
</div>

}



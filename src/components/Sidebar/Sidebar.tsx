import {
  BiBookAlt,
  BiHome,
  BiMessage,
  BiSolidReport,
  BiTask,
} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {

  return (
    <div className='menu'>
      <div className="logo">
        <BiBookAlt className='logo-icon' />
        <h2>Kim Bling</h2>
      </div>

      <div className="menu--list">
        <Link to="/admin" className="item">
          <BiHome className='icon' />
          Dashboard
        </Link>
        <Link to="/admin/blog" className="item">
          <BiTask className='icon' />
          Blog
        </Link>
        <Link to="/admin/role" className="item">
          <BiSolidReport className='icon' />
          Role
        </Link>
        <Link to="/admin/client" className="item">
          <BiMessage className='icon' />
          Client
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
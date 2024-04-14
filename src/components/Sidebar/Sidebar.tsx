import {
  BiBookAlt,
  BiHome,
  // BiMessage,
  BiSolidReport,
  // BiStats,
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
        {/* <a href="#" className="item">
          <BiStats className='icon' />
          Client
        </a>
        <a href="#" className="item">
          <BiMessage className='icon' />
          Message
        </a> */}
      </div>
    </div>
  )
}

export default Sidebar
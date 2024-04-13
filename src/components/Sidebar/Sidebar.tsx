import {
  BiBookAlt,
  BiHome,
  BiMessage,
  BiSolidReport,
  BiStats,
  BiTask,
} from 'react-icons/bi';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='menu'>
      <div className="logo">
        <BiBookAlt className='logo-icon' />
        <h2>Kim Bling</h2>
      </div>

      <div className="menu--list">
        <a href="#" className="item">
          <BiHome className='icon' />
          Dashboard
        </a>
        <a href="#" className="item">
          <BiTask className='icon' />
          Assigment
        </a>
        <a href="#" className="item">
          <BiSolidReport className='icon' />
          Report
        </a>
        <a href="#" className="item">
          <BiStats className='icon' />
          Stats
        </a>
        <a href="#" className="item">
          <BiMessage className='icon' />
          Message
        </a>
      </div>
    </div>
  )
}

export default Sidebar
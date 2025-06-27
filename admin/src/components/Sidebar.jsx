import React from 'react'
import { BiBookAlt,BiBed, BiHelpCircle, BiHome,BiTask,  BiCookie, BiTime, } from 'react-icons/bi'
import  '../styles/sidebar.css';
import { Link } from 'react-router-dom'
import { BsFillPeopleFill } from 'react-icons/bs';


const Sidebar = () => {
  return (
    <div className='menu'>
        <div className="logo">
            <BiBookAlt  className='logo-icon'/>
            <h2>Hotel</h2>
        </div>

        <div className="menu--list">
        <Link to="/dashboard"  className="item">
                <BiHome className='icon' />
                Dashboard
            </Link>
        </div>
        <div className="menu--list">
        <Link to="/dhomat"  className="item">
                <BiBed className='icon' />
                Dhomat
            </Link>
        </div>
        <div className="menu--list">
        <Link to="/rezervimet"  className="item">
                <BiBed className='icon' />
                Rezervimet
            </Link>
        </div>
    
        <div className="menu--list">
            <Link to="/menu"  className="item">
                <BsFillPeopleFill className='icon' />
               Menu
            </Link>
        
        </div>

        
        <div className="menu--list">
            <Link to="/puntoret"  className="item">
                <BsFillPeopleFill className='icon' />
               Puntoret
            </Link>
        
        </div>

        <div className="menu--list">
        <Link to="/orari"  className="item">
                <BiTime className='icon' />
                Orari
            </Link>
        </div>
 
        
        <div className="menu--list">
        <Link to="/help"  className="item">
                <BiHelpCircle className='icon' />
                Help 
            </Link>
        </div>

        <div className="menu--list">
        <Link to="/logout"  className="item">
                <BiHelpCircle className='icon' />
                Logout
            </Link>
        </div>

        <div className="menu--list">
            <Link to="/users"  className="item">
                <BsFillPeopleFill className='icon' />
               Users
            </Link>
        
        </div>

      
    
    

      
    </div>
  )
}

export default Sidebar
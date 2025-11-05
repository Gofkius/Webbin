import React from 'react'
import { useNavigate } from "react-router-dom";
import SmallProfileCard from './SmallProfileCard';



type Props = {}

const Navbar = (props: Props) => {
    const navigate = useNavigate();

    function handleHomeNavigate() {
        navigate('/');
    }
    
    function handleAboutNavigate() {
        navigate('/about');
    }

    function handleLogoutNavigate() {
        navigate('/login');
    }

  return (
    <div className='navbar-full'>
        <div className="navbar">
            <div onClick={handleHomeNavigate} className='logo-navbar'><img src="./images/logo.svg" alt="" /></div>
            <button onClick={handleHomeNavigate}>Home</button>
            <button onClick={handleAboutNavigate}>Explore</button>
            <button onClick={handleLogoutNavigate}>Design</button>
        </div>
        <SmallProfileCard />
    </div>
  )
}

export default Navbar

import React, { useState } from "react";
import { Link , NavLink } from 'react-router-dom';
import './Header.css';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/UserSlice";
import { current } from "@reduxjs/toolkit";
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
function Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isMenuOpen ,setIsMenuOpen] = useState(false);

  const handleLogout = (event) => {
    dispatch(logout());
    navigate("/");
    setIsMenuOpen(false);
  }
  
  return (
    <nav className="navbar">
      <div className="navbarleft">
         <span className="emoji">🤝</span>
         <div className="left-text">
        <h2 className="logo"> Labour<span>Link</span></h2>
        <p className="line">Connecting Hands to Work</p>
      </div>
      </div>

<div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      <ul className={`navlinks ${isMenuOpen ? "open" : ""}`}>
        <li><NavLink to="/" onClick={()=>setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}><HomeIcon sx={{ fontSize: "18px", marginRight: "2px" }} />Home</NavLink></li>
        <li><NavLink to="/post-job" onClick={()=>setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""} ><AddIcon sx={{ fontSize: "18px", marginRight: "2px" }} />Post Job</NavLink></li>
        <li><NavLink to="/find-work" onClick={()=>setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""} ><SearchIcon sx={{ fontSize: "18px",marginRight: "2px" }} />Find Work</NavLink></li>
        <li><NavLink to="/contact" onClick={()=>setIsMenuOpen(false)} className={({isActive}) => (isActive ? "active-link" : "")}><CallIcon sx={{ fontSize: "18px", marginRight: "2px" }} />Contact</NavLink></li>
      </ul>

      <div className="buttons">
        {!currentUser && <Link to="/login" className="btn login-btn" onClick={()=>setIsMenuOpen(false)}><LoginIcon sx={{ fontSize: "19px", paddingRight: "3px" }} />Login</Link>}
        {currentUser && <button onClick={handleLogout} className="btn login-btn">LogOut</button>}

      </div>
    </nav>
  );

}

export default Header;

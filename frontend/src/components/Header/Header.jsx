import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../redux/UserSlice";
import { current } from "@reduxjs/toolkit";


function Header() {
  const navigate = useNavigate();
const { currentUser } = useSelector((state) => state.user);
const dispatch = useDispatch();

const handleLogout = (event)=>{
  dispatch(logout());
  navigate("/");
}
  return (
    <nav className="navbar">
      <div className="navbarleft">
        <h2 className="logo">Labour<span>Link</span></h2>
        <p className="line">Connecting Hands to Work</p>
      </div>

      <ul className="navlinks ">
        <li><Link to="/" className=""><HomeIcon sx={{ fontSize: "20px", paddingBottom: "3px" , marginRight : "2px" }} />Home</Link></li>
        <li><Link to="/post-job"><AddIcon sx={{ fontSize: "20px", paddingBottom: "3px" , marginRight : "2px"}} />Post Job</Link></li>
        <li><Link to="/find-work"><SearchIcon sx={{ fontSize: "20px", paddingBottom: "3px"  , marginRight : "2px"}} />Find Work</Link></li>
        <li><Link to="/contact"><CallIcon sx={{ fontSize: "20px", paddingBottom: "3px" , marginRight : "2px" }} />Contact</Link></li>
      </ul>

      <div className="buttons">
        {!currentUser && <Link to="/login" className="btn btn-primary">Login</Link> }
        {currentUser && <button onClick={handleLogout}  className="btn btn-primary">LogOut</button>}
        
      </div>
    </nav>



  );

}

export default Header;

import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location=useLocation();
  return (
    <div className='header'>
        {/* <p className='logo'>My Shop</p> */}
        <div className='header-right'>
            <Link to="/">
                <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={()=>setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            {/* {sessionStorage.getItem("Login")!=null?(

                <Link to="/add">
                    <p className={`${activeTab === "AddContact" ? "active" : ""}`} onClick={()=>setActiveTab("AddContact")}>
                        Profile
                    </p>
                </Link>
            ):( */}
                <Link to="/login">
                    <p className={`${activeTab === "AddContact" ? "active" : ""}`} onClick={()=>setActiveTab("AddContact")}>
                    {sessionStorage.getItem("Login")==null?(
                        "Login"
                        ):(
                           "Profile" 
                        )}
                    </p>
                </Link>
            {/* )} */}
            {/* <Link to="/about">
                <p className={`${activeTab === "About" ? "active" : ""}`} onClick={()=>setActiveTab("About")}>
                    About
                </p>
            </Link> */}
        </div>
    </div>
  )
}

export default Header
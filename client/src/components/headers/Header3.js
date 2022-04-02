import React from 'react';
import "./Header.css"

import Profilepic from "./images/profilepic.svg"

const Header3=()=> {
  return (
    <div className='navbar'>
        <div className='navleft'>
            <h2 className='heading1'>LAUNDRY</h2>
        </div>
        <div className='navright'>
            <h4>Pricing</h4>
            <h4>Career</h4>
        </div>
        <div className='profile1'>
            <img src={Profilepic} alt="ProfilePic" />
            <h3 className="profileuser"> User Name </h3>
        </div>
    </div>
    )
}

export default Header3;

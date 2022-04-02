import React from 'react';
import "./Header.css"

const Header2=()=> {
  return (
    <div className='navbar'>
        <div className='navleft'>
            <h2 className='heading1'>LAUNDRY</h2>
        </div>
        <div className='navright'>
            <h4>Home</h4>
            <h4>Pricing</h4>
            <h4>Career</h4>
        </div>
        <h4 className='navbtn1'>Sign Up</h4>
    </div>
    )
}

export default Header2;
import React from 'react';
import "./Footer.css"
import facebook from "./images/facebook.svg";
import instagram from "./images/instagram.svg"
import linkedin from "./images/linkedin.svg"

const Topfooter=()=> {
  return (
    <div className='footercontainer'>
        <div className='task1'>
            <p className='aboutus'>ABOUT US</p>
            <p className='aboutdesc'>Doorstep Wash & Dryclean Service</p>
        </div>
        <div className='task2'>
            <p className='t-one'>Home</p>
            <p className='t-two'>Sign In</p>
            <p className='t-three'>Register</p>
        </div>
        <div className='task3'>
            <p className='t-one'>Pricing</p>
        </div>
        <div className='task4'>
            <p className='t-one'>Career</p>
            <p className='t-two'>Blogs</p>
            <p className='t-three'>Create</p>   
        </div>
        <div className='task5'>
            <p className='t-one'>Content</p>
        </div>
        <div className='task6'>
            <p className='s-media'>SOCIAL MEDIA</p>
            <div className='icons'>
                <img src={facebook} alt="Facebook" />
                <img src={instagram} alt="Instagram" />
                <img src={linkedin} alt="LinkedIn" />
            </div>
        </div>
    </div>
    )
}

export default Topfooter;

import React,{useState, useContext} from "react";
import axios from "axios";
import { store } from "../../App";
// import { useNavigate } from 'react-router';
import './Login.css';
import { Link } from "react-router-dom";
import Header1 from "../headers/Header1";
import Referal from "../referal/Referal";
import Topfooter from "../footer/topFooter";
import Footer from "../footer/Footer";
import { useHistory } from 'react-router-dom';
import { setToken } from "../Auth";


function Login (){
    // const navigate=useNavigate()
    const [user, setUser] = useState({
        email:'',
        password:'',
    });
    const changeHandler = (event) =>{
        setUser({...user,[event.target.name]:event.target.value})
    }
    const submitHandler = async(event)=>{
        event.preventDefault();
      const res= await axios.post("http://localhost:5000/api/v1/login",user)
      if (res.status===200){
          setToken(res.data.token)
        //   navigate("/pastorders")
      }

      console.log(res.data)
      window.location.href = '/createorder' 
        
    }

  return (
        <div className='homepage'>
            < Header1 />
            <div className='lmaincontent'>
                <div className='lleftmain'>
                    <div className='lleftcontent'>
                        <h2 className="lheading2">Laundry Service</h2>
                        <p className='ldescription1'>Doorstep Wash and Drycelan Service</p>
                        <p className='lhaveaccount1'>Dont Have An Account?</p>
                        {/* <button className="lregister-btn1">Register</button> */}
                        <Link to="/register"><button className="lregister-btn1">Register</button></Link>
                    </div>
                </div>
                <div className='lrightmain'>
                    <div className='lrightcontent'>
                        <h2 className='lheading3'>SIGN IN</h2>
                        <form className="loginform" onSubmit={submitHandler} autoComplete="off">
                            <label className="email1">Email</label><br />
                            <input type="email" onChange={changeHandler} name="email" required/><br />
                            <label className="password1">Password</label><br />
                            <input type="password" onChange={changeHandler} name="password" required/><br />
                            <span className='lforget1'>Forget Password?</span><br />
                            <button type="submit" value="Login" className="lsigninbtn" onClick={submitHandler}>Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
            <Referal />
            <Topfooter />
            <Footer />
        </div>
  )
}

export default Login;

import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../mainhome.css";
import axios from "axios";
import { getToken } from '../Auth';
import './orderHeader.css'

function Orderheader() {
  const [user, setUser] = useState("");
  useEffect(async () => {
    console.log("orderheader", getToken());
    await axios
      .get("http://localhost:5000/api/v1/order/get", {
        headers: { Authorization: "test " + getToken() },
      })
      .then((response) => {
        // console.log(response.data)
        setUser(response.data.data.get_user.name);
      })
      // .catch((e) => {
      //   alert("UnAuthorized user");
      // });
  });
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" style={{padding:"0px"}}>
        <Navbar.Brand href="#home" class="laundryhead" style={{color: "#4552c1", marginLeft:"50px", font: "normal normal 900 20px/27px Avenir"}}>
          <h5>LAUNDRY</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto"></Nav>
          <Nav id="login-header">
            <Nav.Link href="#features" style={{color: "#565657", marginRight:"10px", font:"normal normal normal 16px/21px Avenir"}}>Pricing</Nav.Link>
            <Nav.Link href="#features" style={{color: "#565657", marginRight:"10px",font:"normal normal normal 16px/21px Avenir"}}>Career</Nav.Link>
            <Nav.Link href="#features" style={{background:"#4552c1", marginLeft:"10px"}}>
              <p class="signinlink" id="signinlink" style={{color: "#ffffff",font:"normal normal normal 16px/21px Avenir"}}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSDXwxl3CI0u9Bwy-tkjM9cIbiLiIa1QxPJQ&usqp=CAU" class="img" alt="image1" />
                Username
              </p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Orderheader;

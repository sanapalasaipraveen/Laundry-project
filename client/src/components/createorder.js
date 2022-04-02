import React from "react";
import Footer from "./orderFooter/orderFooter";
import Orderheader from "./orderHeader/orderHeader";
import "./mainhome.css";
import "font-awesome/css/font-awesome.min.css";
import { useHistory } from "react-router-dom";
//import { clearToken } from './Auth';

function Createorder() {
  const history = useHistory();
  //const clear = clearToken()
  // function removetoken(){
  //   clearToken()
  //   history.push("/")
  // }
  return (
    <div>
      <Orderheader />
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-1 main-head" style={{width:"3%", padding:"0px"}}>
            <div class="row">
              <div className="col-lg-12">
                <i
                  class="fa fa-home fontmain"
                  onClick={() =>history.push("/")} style={{marginBottom:"7px"}}
                ></i>
              </div>
              <div class="col-lg-12">
                <i
                  class="fa fa-plus-circle fontmain1"
                  onClick={() => history.push("/createorder")} style={{marginBottom:"7px"}}
                ></i>
              </div>
              <div class="col-lg-12">
                <i
                  class="fa fa-bars fontmain"
                  onClick={() => history.push("/pastorders")}
                ></i>
              </div>
            </div>
          </div>
          <div class="col-lg-11">
            <div class="row">
              <div class="col-lg-2">
                <p style={{font:"normal normal 600 18px/48px Open Sans", marginLeft:"30px"}}>Orders</p>
              </div>
              <div class="col-lg-8"></div>
              <div class="col-lg-2">
                <div class="form-group has-search">
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control"
                    id="searchbar"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <div class="createbtn">
              <p class="order-ava" >No Orders available</p>
              <button class="create-button" onClick={() => history.push("/orderlist")}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Createorder;

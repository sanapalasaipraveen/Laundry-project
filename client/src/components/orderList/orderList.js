import React, { useState } from "react";
import Footer from "../orderFooter/orderFooter";
import Orderheader from "../orderHeader/orderHeader";
import "./orderList.css";
import "../mainhome.css";
import "font-awesome/css/font-awesome.min.css";
import { Modal } from "react-bootstrap";
import Ordercomponent from "../ordercomponent";
import Summaryorder from "../summary/summaryOrder";
import { useHistory } from "react-router-dom";

const order = { orderId: "orderId", userId: "userId", details: new Map() };
let orderedDate = [];

function Orderlist() {
  const [show, setShow] = useState(false);
  const history = useHistory();

  function handleCallback(props) {
    order.details.set(props.name, props.value);
    orderedDate = [...order.details].map(([name, value]) => ({
      name,
      value,
    }));
    console.log("orderData", orderedDate);
    return;
  }

  const orderComponents = [
    {
      image: "../images/shirt.jpg",
      description:
        "SHIRTS",
      name: "Shirts",
      type: "Boolean",
    },
    {
      image: "../images/tshirt.jpg",
      description:
        "T-SHIRTS",
      name: "Tshirts",
      type: "Boolean",
    },
    {
      image: "../images/jeans.jpg",
      description:
        "JEANS",
      name: "Jeans",
    },
    {
      image: "../images/trousers.jpg",
      description:
        "TROUSERS ",
      name: "Trousers",
      type: "Boolean",
    },
    {
      image: "../images/Joggers.jpg",
      description:
        "JOGGERS",
      name: "Joggers",
      type: "Boolean",
    },
    {
      image: "../images/Others.jpg",
      description:
        "OTHERS",
      name: "Others",
      type: "Boolean",
    }
  ];
  return (
    <div>
      <Orderheader />
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-1 main-head" style={{width:"3%", padding:"0px"}}>
            <div class="row">
              <div class="col-lg-12">
                <i
                  class="fa fa-home fontmain"
                  onClick={() => history.push("/")} style={{marginBottom:"7px"}}
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
                <p style={{font:"normal normal 600 16px/48px Open Sans", marginLeft:"30px"}}>Create Order</p>
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

            <table className="table maintable" style={{marginLeft:"35px"}}>
              <thead>
                <tr class="table-dark ">
                  <th style={{font:"normal normal 600 16px/48px Open Sans"}}>Product Types</th>
                  <th style={{font:"normal normal 600 16px/48px Open Sans"}}>Quantity </th>
                  <th style={{textAlign:"center", font:"normal normal 600 16px/48px Open Sans"}}>Wash Type</th>
                  <th style={{font:"normal normal 600 16px/48px Open Sans"}}>Price</th>
                  <th style={{font:"normal normal 600 16px/48px Open Sans"}}>Reset</th>
                </tr>
              </thead>
              <tbody>
                {orderComponents.map((orderItem) => (
                  <Ordercomponent
                    image={orderItem.image}
                    description={orderItem.description}
                    name={orderItem.name}
                    handleClick={handleCallback}
                  />
                ))}
              </tbody>
            </table>
            <div class="but-com">
              <button class="btn btn btn-outline-primary cancel" onClick={() => history.push("/createorder")} style={{color:"#5861ae",border:"1px solid #5861ae"}}>Cancel</button>
              <button
                class="btn btn btn-primary proceed"
                onClick={() => setShow(true)} style={{background:"#5861ae 0% 0% no-repeat padding-box", border:"1px solid #5861ae"}}
              >
                Proceed
              </button>
            </div>

            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Summary
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="confirm_page">
                  <div class="row mainadd">
                    <div class="col-lg-4">
                      <h6>Store Location</h6>
                      <p>Jp Nagar</p>
                    </div>
                    <div class="col-lg-4">
                      <h6>Store Address</h6>
                      <p>Near Phone Booth, 10th Road</p>
                    </div>
                    <div class="col-lg-4">
                      <h6>Phone</h6>
                      <p>+91 99999999</p>
                    </div>
                  </div>
                </div>

                <Summaryorder
                  total={orderedDate
                    .map((order) => order.value.price)
                    .reduce((acc, curr) => acc + parseInt(curr, 10), 0)}
                  orderedDate={orderedDate}
                />
              </Modal.Body>
            </Modal>
            <div class="createbtn"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Orderlist;

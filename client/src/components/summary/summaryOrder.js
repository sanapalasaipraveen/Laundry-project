import axios from "axios";
import React, { useState }  from "react";
import { useHistory} from "react-router-dom";
import { getToken } from '../Auth';
import Summaryfinal from "./summaryFinal";
import { Modal } from "react-bootstrap";
import "./Summary.css";

function Summaryorder(props) {
  const history = useHistory();
  const [success, setSuccess] = useState(false);

  async function handleShowSuccess() {
    setSuccess(true);
  }

  async function confirmlist() {
    const data = [];

    props.orderedDate.forEach((order) => {
      data.push({ item: order.name, ...order.value });
    });
    console.log(data)
    await axios.post(
      "http://localhost:5000/api/v1/order",
      {
        orderDetails: data,
        address: "Hyderabad",
        status: "Ready to Pick Up",
      },
      { headers: { Authorization: `test ${getToken()}` } }
    ).then(console.log(data)).catch((e) => {console.log(e.message)});
    handleShowSuccess();
  }

  return (
    <div>
      <p class="order-head">Order Details</p>
      {props.orderedDate.length > 0 &&
        props.orderedDate.map(
          (orderedItem) =>
            orderedItem.value.quantity > 0 &&
            (orderedItem.value.wash ||
              orderedItem.value.fold ||
              orderedItem.value.press ||
              orderedItem.value.pack) && (
              <Summaryfinal
                name={orderedItem.name}
                type={orderedItem.value}
                cost={orderedItem.value.price}
              />
            )
        )}

      <div class="rate-head">Sub Total: {props.total}</div>

      <div class="rate-head">Pickup Charges : 90</div>

      <div class="row totalcss">
        <div class="col-lg-4"></div>
        <div class="col-lg-4"></div>
        <div class="col-lg-4 ">Total : Rs {props.total + 90}</div>
      </div>
      <div class="card-columns col p-1 m-1 row-cols-lg-2">
        <div class="card bg-Basic">
          <div class="card-body text-center">
            <h6 class="card-title">Home</h6>
            <p class="card-text">7th cross Road Maruthi Nagar BTM Phase 1 Bangalore</p>
          </div>
        </div>
        
      </div>

      <div class="btncon">
        <button class="btn btn-primary my-3 " onClick={confirmlist} style={{background:"#5861ae 0% 0% no-repeat padding-box", border:"1px solid #5861ae"}}>
          Confirm
        </button>
      </div>

      <Modal
        show={success}
        onHide={() => setSuccess(false)}
        dialogClassName="modal-30w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          {/* <i class="fas fa-check-circle"></i> */}
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div class="row"></div>
            <div className="cancel_button">
            <div className="circle">
            <span className="tick" style={{width:"150px",height:"150px"}}>&#10003;</span>
            </div>
              <p>
                <b>Your Order is Successfull</b>
              </p>
              <small style={{width:"200px", textAlign:"center"}}>You can track the delivery in the "Orders" section.</small>
              <button
                type="button"
                className="itemsproceed"
                onClick={() => history.push("/pastorders")} style={{borderRadius:"12px"}}
              >
                Go to Orders
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default Summaryorder;

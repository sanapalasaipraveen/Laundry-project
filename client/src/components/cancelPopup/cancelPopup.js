import React from "react";
import './cancelPopup.css'
 
const Cancelpopup = props => {
  return (
    <div>
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Cancelpopup;
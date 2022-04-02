import React,{useEffect} from 'react'
import './calculationComponent.css'

function Calculationcomponent(props) {
  let totPrice = props.price
  let qnt = props.quantity
  let modeCost = totPrice/qnt
  if (props.quantity){
  return (
    <>
    <div className='newwinnerchild'>

        <div className='newtypes'>
          {props.item}
        </div>
        <pre>                        </pre>
        <div className='modes'>
            {props.wash && <span>washing,</span>}
            {props.press && <span>pressing,</span>}
            {props.fold && <span>folding,</span>}
            {props.pack && <span>packing</span>}
        </div>
        <pre>                  </pre>
        
        <span>{props.quantity}</span>
        <pre> </pre>
        <span>X</span>
        <pre> </pre> 
        <span>{modeCost} </span>
        <pre> </pre>
        <span>=</span>
        <pre> </pre>
        <span>{props.price}</span>
        <hr className="hline"></hr>
        </div>
  </>
  )
}

else{
  return(
    <></>
  )
}
}

export default Calculationcomponent
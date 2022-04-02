import React, {useEffect, useState} from 'react'
import './pastOrders.css'
import axios from 'axios'
import Rowcomponent from '../rowComponent/rowComponent'
import username from '../images/username.png'
import homebtn from '../images/homebtn.png'
import more from '../images/more.png'
import list from '../images/list.png'
import { getToken } from '../Auth';
import { clearToken } from '../Auth';
const andvar = '&'
function Pastorders() {
  const [orderedItems, setOrderedItems] = useState([])
  const [orderLength, setOrderLength] = useState(0)
  const routeToCreateOrdersPage = () =>{
    window.location.href = '/createorder'
  }
  
  const currToken = getToken()
  useEffect(() =>{
    axios.get(`http://localhost:5000/api/v1/order`,{
      headers:{
        Authorization: 'test '+ currToken
      }
    }).then((res)=>{
      setOrderedItems(res.data.orderedItems)
      setOrderLength(res.data.orderedItems.length)    
    })
  },[orderLength])

  const routeToHome = () =>{
    window.location.href = '/'
  }
  
  const logout = ()=>{
    clearToken()
    window.location.href = '/'
  }

  return (
  <>
    <div className='title-laundry-bar'></div>
    <div className='laundry'>LAUNDRY</div>
    <div className='pricing'>Pricing</div>
    <div className='career'>Career</div>
    <div className='lastnav' onClick={logout}></div>
    <img className='usernameimg' src={username} onClick={logout} />
    <div className='usernameonly' onClick={logout}>Logout</div>
    <div className='sidenavbar'></div>
    <div className='createbox' onClick={routeToCreateOrdersPage}></div>
    <div className='create' >Create</div>
    <img src={homebtn} className='homesidebtn' onClick={routeToHome}/>
    <img src={more} className='morebtn' onClick={routeToCreateOrdersPage}/>
    <img src={list} className='listbtn'/>
    <div className='pastorderfooter'>
    <div className='footer-content'>2022 O Laundry</div>
    </div>

    {orderLength && 
    <div>
      <div className='orders'>Orders | {orderLength}</div>
      
      <input className='search' value=''/>
        <div className='main-header'></div>
        <div className='order-id'>
          OrderID
        </div>
        <div className='orderdateandtime'>
          Order Date {andvar} Time
        </div>
        <div className='storelocationclass'>
          Store Location
        </div>
        <div className='city'>
          City
        </div>
        <div className='storephone'>
          Store Phone
        </div>
        <div className='totalitems'>
          Total Items
        </div>
        <div className='price'>
          price
        </div>
        <div className='status'>
          Status
        </div>
        <div className='forcancel'>

        </div>
        <div className='view'>
          view
        </div>
      <div className='mapdiv'>
      { orderedItems.map((eachItem)=>{       
          return <Rowcomponent key={eachItem._id} {...eachItem} />
        })}
      </div>
      
    </div>
    }
  </>
  )
}
export default Pastorders
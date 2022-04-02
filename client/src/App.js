import React,{useState, createContext} from "react";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import Pastorders from "./components/pastOrder/pastOrders";
import Createorder from "./components/createorder";
import Orderlist from "./components/orderList/orderList";

export const store = createContext()
function App() {
  const[token, setToken] = useState(null)
  return (
    <Router>
      <div className="App"></div>
      <store.Provider value={[token, setToken]}>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
         <Route exact path="/register">
            <Register />
           </Route>
          <Route exact path="/createorder">
            <Createorder />
          </Route>
          <Route exact path="/orderlist">
            <Orderlist />
          </Route>
          <Route path="/pastorders">
            <Pastorders />
          </Route> 
        </Switch>
      </store.Provider>
    </Router>
  );
}

export default App;
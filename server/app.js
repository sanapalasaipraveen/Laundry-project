const express = require("express");
const mongoose = require('mongoose');
const loginRoutes = require("./routes/login");
const orderRoutes = require("./routes/order");
const SECRET = "restapi";
const bodyparser = require("body-parser");
const cors = require('cors')
var jwt = require('jsonwebtoken');
const User = require("./models/register");

const DB="mongodb+srv://Team9:Team9@cluster0.6zc7y.mongodb.net/project1?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser: true , useUnifiedTopology: true 
}).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log('connection error'))

const app = express();
app.use(bodyparser.json());
app.use(cors())

app.use("/api/v1/order", (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: "failed here1",
        message: "Token is missing"
    });
    }
    const token = authorization.replace("test ", "");
    jwt.verify(token, SECRET, async (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: "failed here2",
          message: "Invalid token"
      });
      }
      const _id  = payload.data;
      console.log(_id,payload.data)
      await User.find({ _id:_id }).then((userdata) => {
        req.user = userdata;
        console.log(req.user,userdata,"userdata")
        next();
      });
    });
});

// MIDDLEWARE FOR GET ROUTE ON USERDETAILS FOR ORDERS PAGE//
app.use("/api/v1/get", (req, res, next) => {
    var token = req.headers.authorization.split("test ")[1];
    // console.log(token)
    if(!token){
        return res.status(401).json({
            status: "failed",
            message: "Token is missing"
        })
    }
    // verify the token    
    jwt.verify(token, SECRET, async function(err, decoded) {
        if(err){
            return res.status(401).json({
                status:"failed",
                message: "Invalid token"
            })
        }
        req.user = decoded.data;
        console.log(req.user)
        next();
    });
});

app.use("/api/v1", loginRoutes);
app.use("/api/v1", orderRoutes);

app.listen(5000, () => console.log("server is started"));
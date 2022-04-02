const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
router.use(bodyparser.json());
const order = require("../models/orders");
const mongoose = require("mongoose");
// const User = require("../models/register")

router.get("/order",async(req,res)=>{
    const orderedItems = await order.find({user_id:req.user})
    console.log(orderedItems)
    res.json({
        status: "success",
        orderedItems
    });
})

router.post("/order", async (req,res) => {

    try{
    const Wash = 20; 
    const Press=15;
    const Fold=10;
    const Pack=25;
    const ordnum = "ORD000" + ((await order.countDocuments()) +1)     // finding the current count of documents and adding 1 to give new ordernumber

    const Orders = req.body.orderDetails;
    let tot_price = 0;
    let tot_quant = 0;

    Orders.forEach((Order) => {

        // calculating the each garment service price
        let sum = 0;
        if(Order.wash){sum+=(Order.quantity * Wash)};
        if(Order.press){sum+=(Order.quantity * Press)};
        if(Order.fold){sum+=(Order.quantity * Fold)};
        if(Order.pack){sum+=(Order.quantity* Pack)};
        Order["price"] = sum;     // setting the price value for that garment service
        tot_price+=sum;           // calculating the cumulative order price
        tot_quant+=parseInt(Order.quantity);  // calculating the cumulative quantities
    });

    const { address, status } = req.body;
    //creating the order in DB
    const details  = await order.create({
        order_id:ordnum,
        orderDetails:Orders,
        total_quantity:tot_quant,
        user_id:mongoose.Types.ObjectId(req.user[0]._id),
        total_price:tot_price,
        address,
        status,
    });
    console.log("order.user-->", details.user, "req.user-->", req.user);
// if successfull prints as below
    res.json({
        status:"order placed successfully",
        data: details
    });
    // if not successfull prints as below
    } catch(e){
        res.status(400).json({
            status:"order not placed",
            message:e.message
        });
    };

});


router.put("/order/:id", async (req,res) => {
    // below we are first querying the exact order place by the corresponding user
    console.log(req.user)
    try{
        const details = await order.updateOne({
            _id: req.params.id,    
            user_id:req.user                     //order ID
                                 // user ID
        },
        {status:"Cancelled"},            // updating the order status       
        );

        return res.json({
            status:"successfully order status updated",
            data: details
        });
        } catch(e){
            return res.json({
                status:"failed to update order",
                message:e.message
            });
        };
})
router.get("/order/:id", async (req,res) => {
    // below we are first querying the exact order place by the corresponding user
    console.log(req.user)
    try{
        const details = await order.findOne({
            _id: req.params.id,    
            user_id:req.user                   //order ID
                                 // user ID
        })
        return res.json({
            status:"successfully order status updated",
            data: details
        });
        } catch(e){
            return res.json({
                status:"failed to update order",
                message:e.message
            });
        };
})

router.get('/order/get', async (req,res)=>{
    try{
        const get_user = await order.findOne({user_id:req.user
        });
        console.log(req.user,"request")
        return res.json({
            status: "success",
            data: { get_user}
          });
    }
    catch(err){
        res.status(400).json({
            status:"failed",
            message : err.message
        })
    }
})

module.exports = router;
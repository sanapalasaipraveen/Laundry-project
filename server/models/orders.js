const mongoose = require("mongoose");



//the below schema helps us to make a order 
const OrderSchema = mongoose.Schema(
  {
    order_id: { type: String, required: true }, //order ID in the format ORDxxxx
    user_id: { type: mongoose.Types.ObjectId, reference: "User" }, //gets fetched from user model
    orderDetails: [                                    // inside this array object it stores orer details for each specific garment
      {
        item: { type: String },                       
        quantity: { type: Number },                  
        wash: { type: Boolean, default: false },     
        press: { type: Boolean, default: false },    
        fold: { type: Boolean, default: false },       
        pack: { type: Boolean, default: false },       
        price: { type: Number, required: true },    
      }
    ],
    total_quantity: { type: Number },        
    total_price: { type: Number },          
    status: {type: String,default:"Ready to Pick Up",required: true}, 
  },
  { timestamps: true }           
);
const order = mongoose.model("Orders",OrderSchema)   
module.exports = order
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    contact: {type:Number, minlength:10, maxlength:10},
    state:{type:String, required:true},
    district:{type:String, required:true},
    address:{type: String},    
    pincode:{type:Number, minlength:6, maxlength:6},
    password:{type:String, required:true}
})


const User = mongoose.model("User", userSchema);
module.exports = User
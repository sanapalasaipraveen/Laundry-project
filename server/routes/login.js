const express = require('express');
const router = express.Router();
const User = require("../models/register");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyparser = require("body-parser");
router.use(bodyparser());
const SECRET="restapi";
const mongoose = require("mongoose");
const { body, param, validationResult } = require('express-validator');
// --------- Register User  ------------------
router.post('/register', async (req,res)=>{
    console.log(req.body)
    try{
        const {name,email,mobile,state,district,address,pincode,password} = req.body;
        const exist = await User.findOne({email});
        if (exist){
            return res.status(400).send('User Already Existed');
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            try{
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        status:"Failed",
                        message:"Invalid Data"
                    });
                }else{
                    let newUser = await User.create({
                        name,
                        email,
                        mobile,                        
                        state,
                        district,
                        address,
                        pincode,
                        password:hash,
                    });
                    return res.status(200).json({
                        status:"Success",
                        data: newUser
                    });
                }
            }
            catch(err){
                res.status(400).json({
                    status:"Failed",
                    message:err.message
                })
            }
        })
    }
    catch(err){
        console.log(err)
        return res.send(500).send('Server Error');
    }
})
// ---------------- Login User ---------------------------------------
router.post('/login', async (req,res)=>{
    try{
        // console.log(req.body);
        const {email,password} = req.body;
        const user = await User.findOne({email});
        // console.log(user)
        if(!user){
            return res.status(400).send('User Not Exist');
        }
        bcrypt.compare(password, user.password, async function(err, result){
            if(err){
                // console.log(err)
                return res.status(400).json({
                    status:"Failed",
                    message:"Invalid Credentials"
                })
            }else{
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (6000 * 60),
                    data: user._id
                  }, SECRET);
                return res.json({
                    status: result? "Login Successful": "Invalid Login",
                    token : token
                })
            }
        })
    }
    catch(err){
        res.status(400).json({
            status:"failed",
            message : err.message
        })
    }
})

// router.get('/get', async (req,res)=>{
//     try{
//         const get_user = await User.findOne({
//             email: req.user.email
//         });
//         console.log(get_user)
//         return res.json({
//             status: "success",
//             data: { get_user}
//           });
//     }
//     catch(err){
//         res.status(400).json({
//             status:"failed",
//             message : err.message
//         })
//     }
// })
module.exports = router;
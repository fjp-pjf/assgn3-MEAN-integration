const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Productdata = require('../models/Productdata');

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((err,registeredUser)=>{
        if(err){
            console.log(err)
        }else{
            let payload = { subject:registeredUser._id }
            let token = jwt.sign(payload,'secretkey')
            res.status(200).send({ token })
        }
    })
})//register form

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err)
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }else
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password')
                }else{
                    let payload = { subject:user._id }
                    let token = jwt.sign(payload,'secretkey')
                    res.status(200).send({ token })
                }
        }
    })
})

module.exports = router;
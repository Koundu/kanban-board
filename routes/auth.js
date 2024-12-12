const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//Signup Route
router.post('/signup', async (req,res)=>{
    const {email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).json({message:'User already exists'});

    const user = new User({email, password});
    await user.save();
    const token = jwt.sign({id:user._id},process.env.JWT_SECRECT,{expiresIn:'30d'});
    res.status(201).json({token});
})

//Login Route
router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'User not Found'});
    const match = await user.matchPassword(password);
    if(!match) return res.status(400).json({message:'Invalid Credentials'});
    const token = jwt.sign({id:user_id}, process.env.JWT_SECRECT, {expiresIn:'30d'});
    res.json({token});
});

module.exports = router;
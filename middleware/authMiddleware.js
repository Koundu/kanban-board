const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { message } = require('@pankod/refine');

const protect = async (req,res,next)=>{
    const token = req.header('Autherization')?.replace('Bearer ','');
    if(!token){
        return res.status(401).json({message:'No token, autherization denied'});
    }
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = await User.findById(decoded.id);
    next();
} catch (error) {
    res.status(401).json({message:'Token is not valid'});
}
}

module.exports = {protect};
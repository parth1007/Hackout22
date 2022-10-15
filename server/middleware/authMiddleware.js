const jwt = require('jsonwebtoken');
const Investor = require('../schema/Investor');
const asyncHandler = require('express-async-handler');


// Gets the User after verifying the JWT Token

const accessJwtToken = asyncHandler(async (req,res,next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
    {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_STRING);

            // define user variable inside req body
            req.user  = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorised, token failed");
            
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized, token not available");
    }

})

module.exports = {accessJwtToken};

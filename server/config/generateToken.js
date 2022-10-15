const jwt = require('jsonwebtoken');

// Generate a JsonWebToken for a given userID

const generateToken = (id) =>{
    return jwt.sign(
        {id},
        process.env.JWT_STRING,
        {expiresIn:"30d"}
    )
};

module.exports = generateToken;
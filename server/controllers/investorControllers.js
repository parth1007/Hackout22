const Investor = require('../schema/Investor');
const generateToken = require('../config/generateToken');
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');


// Register Investor
// api/investor/register
// Req.body => name, email, password

const registerInvestor = asyncHandler(async (req,res) => {
    
    console.log(req.body);
    const { name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields")
    }

    const userExists = await Investor.findOne({ email:email });
    console.log("HEllo");
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Password Encryption

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const investor = await Investor.create({
        name:name,
        email:email,
        password:hashedPassword,
    });


    if (investor) {
        res.status(201).json({
          _id: investor._id,
          name: investor.name,
          email: investor.email,
          token: generateToken(investor._id),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }
    
});


// Login Investor
// api/investor/login
// Req.body => email,password

const loginInvestor = asyncHandler(async (req,res) => {
    const { email,password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please enter all the fields")
    }

    const userExists = await Investor.findOne({ email:email });
    const isCorrect = await bcrypt.compare(password, userExists.password);
    if (userExists && isCorrect) {
        res.status(201).json({
            _id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          token: generateToken(userExists._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid Credentials");
    }
    
});


// Search Investor for a given search query
// api/investor?search=parth
// Auth Token given

const getInvestor = asyncHandler(async (req, res) => {

    // keyword should satisfy either name or email; check is case-insensitive;
    const keyword = req.query.search ? {
        $or:[
            {name:{$regex:req.query.search,$options:'i'}},
            {email:{$regex:req.query.search,$options:'i'}}
        ]
    }:{};

    // Search search result excluding logged user
    const investors = await Investor.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(investors);
    
})


module.exports = {registerInvestor,loginInvestor,getInvestor};
const Startup = require('../schema/Startup');
const generateToken = require('../config/generateToken');
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');


// Register startup
// api/startup/register
// Req.body => name, email, password

const registerStartup = asyncHandler(async (req,res) => {
    const { name,email,password,marketcap,stage,description,category,investorCount,dilutedEquity} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields")
    }

    const userExists = await Startup.findOne({ email:email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Password Encryption

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const startup = await Startup.create({
        name:name,
        email:email,
        password:hashedPassword,
        marketcap:marketcap,
        stage:stage,
        description:description,
        category:category,
        investorCount:investorCount,
        dilutedEquity:dilutedEquity,
    });


    if (startup) {
        res.status(201).json({
          _id: startup._id,
          name: startup.name,
          email: startup.email,
          marketcap: startup.marketcap,
          stage: startup.stage,
          description: startup.description,
          category: startup.category,
          investorCount: startup.investorCount,
          dilutedEquity: startup.dilutedEquity,
          token: generateToken(startup._id),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }
    
});


// Login startup
// api/startup/login
// Req.body => email,password

const loginStartup = asyncHandler(async (req,res) => {
    const { email,password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please enter all the fields")
    }

    const userExists = await Startup.findOne({ email:email });
    const isCorrect = await bcrypt.compare(password, userExists.password);
    if (userExists && isCorrect) {
        res.status(201).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            marketcap: userExists.marketcap,
            stage: userExists.stage,
            description: userExists.description,
            category: userExists.category,
            investorCount: userExists.investorCount,
            dilutedEquity: userExists.dilutedEquity,
            token: generateToken(userExists._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid Credentials");
    }
    
});


// filter startups for a given queries
// api/startup/getStartups
// Auth Token given

const getStartups = asyncHandler(async (req, res) => {

    const { minMarketcap,maxMarketcap,stage} = req.body;
    console.log(req.body);
    const startups = await Startup.find({ marketcap: { $gte: minMarketcap, $lte: maxMarketcap }, stage: stage });


    res.send(startups);
    
})


module.exports = {registerStartup,loginStartup,getStartups};
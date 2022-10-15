const mongoose = require('mongoose');
// const Investor = require('../schema/Investor.js')

const startupSchema = mongoose.Schema(
    {
        name:{
            type:String, 
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String, 
            required:true,
            unique:true
        },
        marketcap:{
            type:Number,
            required:true
        },
        stage:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        investorCount:{
            type:Number,
            default: 0,
        },
        dilutedEquity:{
            type:Number,
            required:true,
            default: 0,
        },
    },
    {timestamps:true}
);


module.exports = mongoose.model('Startup', startupSchema);

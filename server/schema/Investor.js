const mongoose = require('mongoose');
const Startup = require('../schema/Startup.js')

const investorSchema = mongoose.Schema(
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
        Investments: [
            {
              type: mongoose.Types.ObjectId,
              ref: "Startup",
            },
          ],
    },

    {timestamps:true}
);


module.exports = mongoose.model('Investor', investorSchema);

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const dotenv = require("dotenv");
const investorRoutes = require('./routes/investorRoutes')
const startupRoutes = require('./routes/startupRoutes')



var cors = require('cors')

const app = express();
app.use(cors()) 

dotenv.config();


app.use(express.json());

app.use('/api/investor',investorRoutes);
app.use('/api/startup' , startupRoutes)



// ********** Check for its use ***********

app.use(bodyParser.json({limit: "30mb",extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended:true}));
app.use(cors());

// Connect to mongodb atlas

const CONNECTION_URL = "mongodb+srv://ryuzaki:nvamnvar@cluster0.ywxdskv.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;


mongoose.connect(CONNECTION_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to MongoDB');
});
    
   
app.listen(8000 , () => {
    console.log("Connected to backend !")
})
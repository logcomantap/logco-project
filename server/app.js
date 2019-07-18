require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const errorHandler = require('./helpers/errorHandler.js');

mongoose.connect('mongodb://localhost/logco', {useNewUrlParser: true})
.then(()=>{
    console.log('connected');
    
})
.catch(()=>{
    console.log('failed to connect');
    
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use(errorHandler)

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`connected to localhost ${PORT}`);
});
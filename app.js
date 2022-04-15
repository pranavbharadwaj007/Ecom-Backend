const express =require('express');
require('dotenv').config();
const app=express();
const morgan = require('morgan')
const cookieParser=require("cookie-parser");
const fileUpload=require("express-fileupload");
// regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// cookies and file middleware
app.use(cookieParser());
app.use(fileUpload());


// morgan middleware
app.use(morgan('tiny'))


module.exports=app;



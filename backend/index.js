require('dotenv').config()
const express = require('express')
const app = express()
const dbConnection = require('./dbConnection/connection')


dbConnection()


app.use(express.urlencoded({ extended: false }));
app.use(express.json())



app.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.PORT}`);
})
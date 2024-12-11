require('dotenv').config()
const express = require('express')
const app = express()
const dbConnection = require('./dbConnection/connection')
const menuRoutes = require('./routes/menu')

dbConnection()


app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/',menuRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.PORT}`);
})
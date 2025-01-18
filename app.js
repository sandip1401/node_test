const app=require('express')();
const http=require('http').Server(app);
require('dotenv').config();
console.log("here is mongo",process.env.MONGODB_URL);
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://sandipgpay224:Sandip&14@cluster0.kvho0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const Person=require('./models/userModel');

const bodyParser = require("body-parser"); // Correct case
app.use(bodyParser.json()); // Use the JSON parser middleware

const PORT=process.env.PORT;
http.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})


const personroutes=require('./routes/personroutes');
app.use('/',personroutes);




const express = require("express");
const app = express();
const http = require("http").Server(app);
require("dotenv").config();
const mongoose = require("mongoose");
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
// Database Connection

mongoose.connect('mongodb+srv://sandipgpay224:Sandip&14@cluster0.kvho0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json()); // Built-in body-parser middleware

// Routes
const personroutes = require("./routes/personroutes");
const person = require("./models/userModel");
app.use("/", personroutes);

app.use(passport.initialize());
app.get('/',passport.authenticate('local',{session:false}),function(req,res){
  res.send('welcome to our hotel')
})

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
  try{
    console.log('Received credentials',USERNAME,password);
    const user=await person.findOne({username:USERNAME});
    if(!user){
      return done(null,false,{message:'Incrrect Username'});
    }
    const isPasswordMatch=user.password===password?true:false;
    if(isPasswordMatch){
      return done(null,user);
    }
    else{
      return done(null,false,{message:'Incorrect Password'});
    }
  }
  catch(err){
    return done(err);
  }
}))



// Start Server
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
});


// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
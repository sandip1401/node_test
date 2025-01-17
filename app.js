const app=require('express')();
const http=require('http').Server(app);

const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://sandipgpay224:Sandip&14@cluster0.kvho0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const Person=require('./models/userModel');

const bodyParser = require("body-parser"); // Correct case
app.use(bodyParser.json()); // Use the JSON parser middleware

http.listen(3000,()=>{
    console.log('server is running');
})

app.post('/person',async(req,res)=>{
    try{
        const data=req.body
        const newPerson= new Person(data);
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

app.get('/person',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetch');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'not found'});
    }
})

const personroutes=require('./routes/personroutes');
app.use('/',personroutes);




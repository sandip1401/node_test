const express=require('express');
const Person = require('../models/userModel');
const router=express.Router();

router.post('/person',async(req,res)=>{
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

router.get('/person/:work',async(req,res)=>{
    try{
        const db_quary=req.params.work
        const data = await person.find({ work: db_quary }); 
        console.log('data fetch');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePersonData=req.body;
        const response=await person.findByIdAndUpdate(personId,updatePersonData);
        
        console.log('data updated');
        console.log(response);
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'not found'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' }); // Add missing parenthesis
        }

        console.log('Data deleted');
        res.status(200).json({ message: 'Person deleted successfully' }); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'not found'});
    }
})
//comment added
//comment added for testing purpose
// fourth test

module.exports=router;
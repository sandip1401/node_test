const express=require('express');
const person = require('../models/userModel');
const router=express.Router();

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

module.exports=router;
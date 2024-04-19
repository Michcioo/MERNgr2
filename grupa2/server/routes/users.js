const express = require("express")
const router = express.Router()
const User = require('../models/User')

router.get("/" , async(req,res)=>{
    try{
        const users = await User.find({})
        res.json(users)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post("/" , async(req,res)=>{
    try{
        const newuser = new User(req.body)
        await newuser.save()
        res.status(201).json(newuser)
    }catch(err){
        console.error(`Error : ${err.message}`)
        res.status(400).json(err)
    }
})

router.delete("/:id", async (req,res)=>{
    const userid = req.params.id
    try
    {
        const deleteduser = await User.findByIdAndDelete(userid)

        if(!deleteduser){  
            return res.status(404).json({message:"user not found"})
        }
        res.json({message:"user deleted"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router
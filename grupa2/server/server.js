const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

const myDB = "myDB"
const url = `mongodb://localhost:27017/${myDB}`
mongoose.connect(url)
    .then(()=>console.log("Zostales polaczony"))
    .catch((err)=>console.log("Error : " , err.message))

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    age:Number
})
const User= mongoose.model("User" , userSchema)

app.get("/api/users" , async(req,res)=>{
    try{
        const users = await User.find({})
        res.json(users)
    }
    catch(err){
        res.status(500).message({message:err.message})
    }
})

app.delete("/api/users/:id", async (req,res)=>{
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

app.post("/api/users" , async(req,res)=>{
    
})

app.listen(PORT , ()=>{
    console.log("Odpaliles serwer na : ", PORT)
})
process.on('SIGINT' , ()=>{
    console.log("Polaczenie zamkniete")
    mongoose.disconnect()
    .finally(()=>process.exit())
})

//michal dorocki
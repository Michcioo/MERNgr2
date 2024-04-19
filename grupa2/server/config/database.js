const mongoose = require('mongoose')
async function connectiontomongo(url){
    try{
        await mongoose.connect(url)
        console.log("Connected")
    }catch(err){
        console.log(err.message)
    }
}
module.exports=connectiontomongo
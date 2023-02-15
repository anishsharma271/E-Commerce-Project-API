const mongoose=require('mongoose');
const Schema= mongoose.Schema;


let user= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports= new mongoose.model('user',user)
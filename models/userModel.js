const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    email:{type:String, required:true, lowercase:true, unique:true},
    username:{type:String, required:true, lowercase:true, unique:true},
    password:{type:String, required:true},
    isDeleted:{type:Boolean, default:false}
})

const userModel=mongoose.model("user", userSchema)

module.exports=userModel
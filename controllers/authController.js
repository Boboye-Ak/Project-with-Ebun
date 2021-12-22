const {isEmail}=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/usermodel")
const Patient=require("../models/patientmodel")

const createToken=(id)=>{
    const token=jwt.sign({id}, "boboyesecret", {expiresIn:3*24*60*60})
    return token
}

module.exports.signup_post=async (req, res)=>{
    const {email, password, username}=req.body
    let error={
        email:"",
        username:""
    }
    const isemail=isEmail(email)
    const emailCheck=await User.findOne({email:email})
    const userNameCheck=await User.findOne({username:username})
    if (emailCheck){
        error.email="Email already registered"
        return res.json({error})
    }
    if (userNameCheck){
        error.username="Username already registered"
        return res.json({error})
    }
    if (!isemail){
        error.email="Please enter valid email"
        return res.json({error})
    }


    const salt= await bcrypt.genSalt()
    const hashedPassword=await bcrypt.hash(password, salt)
    let id=Date.now().toString()
    let newUser=await User.create({id:id, email:email, password:hashedPassword})
    const newUser_id=newUser._id
    const token=createToken(newUser_id)
    res.cookie("jwt", token, {maxAge:3*24*60*60*1000})
    res.json({success:"new user created successfully"})
   
}

module.exports.login_post=async (req, res)=>{
    const {email, password}=req.body
    const user=await User.findOne({email:email, isDeleted:false})
    if (!user){
        return res.json({emailerror:"Please enter a registered email"})
    }
    
    const auth=bcrypt.compare(password, user.password)
    if (!auth){
        return res.json({passworderror:"Please enter correct password"})
    }

    const token=createToken(user._id)
    res.cookie("jwt", token)
    res.json({success:"login successful"})


}

const express=require("express")
const mongoose=require("mongoose")
const cookieParser=require("cookie-parser")
const authRouter=require("./routers/authRouter")

const PORT=(process.env.PORT||5000)
//connect database
const DATABASE="mongodb+srv://boboye:boboye@cluster0.r1cxf.mongodb.net/project-with-ebun?retryWrites=true&w=majority"
mongoose.connect(DATABASE)
//instantiate app
const app=express()

//use middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.static("./assets"))
app.use("/",authRouter)


//set port to listen on
app.listen(PORT, ()=>{
    console.log("Server is active")
})

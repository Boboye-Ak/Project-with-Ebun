const { signup_post, login_post } = require("../controllers/authController");
const express=require("express");
const router=express.Router()


router.post("/signup",signup_post);
router.post("/login", login_post);

module.exports=router;
"use strict";

const {verifyToken} = require("./checkjwt");
const User = require("../../models/User");



 const jwt_va= async(req,res,next)=>{


 if(req.cookies){
 const atoken = req.cookies.accessToken;
 const rtoken =req.cookies.refreshToken;
 const solve = verifyToken(atoken,0);

 if(solve!=null){
    next();

 }else if(rtoken!=null){
  
   const user =new User(req.body);
   const response = await user.refreshToken(rtoken);
    
  res.cookie("accessToken",response,{
      secure : false,
      httpOnly : true,
  });
  next();
 }else{
   console.log("토큰이 만료");
 }
 }else {

 }
 

}

module.exports =jwt_va;



/** */
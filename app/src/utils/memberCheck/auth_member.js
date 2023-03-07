"use strict";

const User = require("../../models/User");

module.exports = { 
    async auth_member(req){
     const at = req.cookies.accessToken;
     try{
         if(at!=null){
             const user =  new User(req.body);
             const response = await user.auth_member(req.cookies.accessToken);
         

             if(response==="admin"){
                const ne = new User(response);
                const data = await ne.adminGetInfo();
                return data;
             }else return null;
             
           }else{
            
             return null;
           }
         }
     catch(err){
         console.log(err);
 
     }
    }
 
 }
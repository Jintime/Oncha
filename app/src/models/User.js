"use strict";

const UserStorage = require("./UserStorage");
const jwt = require("jsonwebtoken");


class User{
    constructor(body){
        this.body=body;
    }     
    
    async getinfo(){
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);
            if(user) return user;
            else return null;
        }catch(err){
            return console.log(err);
        }
    }
    async adminGetInfo(){
        const client =this.body;
        try{
        const user= await UserStorage.adminUserInfo(client.id,);
        if(user){        
         return user;
      }
      return {success:false,msg : "존재하지 않는 아이디입니다."};
     }catch(err){
         return {success :false ,err};
      }
     }

    async login(){
       const client =this.body;
       try{
       const user= await UserStorage.getUserInfo(client.id);

       if(user){
       if(user.id ===client.id && user.password===client.password){
        //access Token 발급
        const accessToken = jwt.sign({
            id : user.id,
           tag : user.tag,
        },process.env.ACCESS_SECRET,{
            expiresIn : '1h',
            issuer : 'About Tech',
        });

        //refresh Token 발급
        const refreshToken = jwt.sign({
            id : user.id,
            tag : user.tag,
        },process.env.REFRESH_SECRET,{
            expiresIn : '24h',
            issuer : 'About Tech',
        });
        
        return {success : true,
        accessToken,refreshToken};
       }
       return {success : false,msg : "비밀번호가 틀렸습니다."};
     } 
     return {success:false,msg : "존재하지 않는 아이디입니다."};
    }catch(err){
        return {success :false ,err};
     }
    }

    async register(){
        const client =this.body;
        try{
        const response = await UserStorage.save(client);
        return response;
        }catch(err){
            return {success : false,err };
        }
    }

    async accessToken(token){
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
    
       const user= await UserStorage.getUserInfo(data.id);
         if(user){
                const {id,tag} = user;
                return {id,tag};
         }}

    async auth_member(token){
            const data = jwt.verify(token, process.env.ACCESS_SECRET);
        
           const user= await UserStorage.getUserInfo(data.id);
             if(user){
                    const {tag} = user;
                    return {tag};
             }}
    

    async refreshToken(token){
        const data = jwt.verify(token, process.env.REFRESH_SECRET);
        const user= await UserStorage.getUserInfo(data.id);

        const accessToken = jwt.sign({
            id : user.id,
            tag : user.tag,
          }, process.env.ACCESS_SECRET, {
            expiresIn : '1m',
            issuer : 'About Tech',
          });
          return  accessToken;
           
        }
             
}


module.exports =User;
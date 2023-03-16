"use strict";

const db =require("../config/db")

class UserStorage{
  static getUserInfo(id){
    return new Promise((resolve,reject)=>{
      const query ="SELECT*FROM users WHERE id=?;";
          db.query(query,[id],(err,data)=>{
            if(err) reject(`${err}`);
            else resolve(data[0]);
            
      });
    });
 }
 //`SELECT * FROM posts ORDER BY id DESC LIMIT ${offset}, ${perPage}`;
 static adminUserInfo(id){
  return new Promise((resolve,reject)=>{
    const query ="SELECT*FROM users";
        db.query(query,[id],(err,data)=>{
          if(err) reject(`${err}`);
          else{
            resolve(data);   
          }                
    });
  });
}
  static async save(userInfo){
    return new Promise((resolve,reject)=>{
      const query ="INSERT INTO users(id,username,password,email,adress) VALUES(?,?,?,?,?);";
          db.query(query,
            [userInfo.id,userInfo.username,userInfo.password,userInfo.email,userInfo.adress],
            (err)=>{
            if(err) reject(`${err}`);
            else resolve({success:true});
      });
    });
 }
}

module.exports =UserStorage;
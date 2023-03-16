"use strict";

const db =require("../config/db");

class BoardStorage{

    static boarderInfo(id){
        return new Promise((resolve,reject)=>{
            const query ="SELECT*FROM com_board WHERE id=?;";
                db.query(query,[id],(err,data)=>{
                  if(err) reject(`${err}`);
                  else{
                    resolve(data);   
                  }                
            });
          });
    }

    static adminboarderInfo(){
      return new Promise((resolve,reject)=>{
        const query ="SELECT*FROM com_board";
            db.query(query,(err,data)=>{
              if(err) reject(`${err}`);
              else{
                resolve(data);   
              }                
        });
      });
    }
    static main_view(){
      return new Promise((resolve,reject)=>{
        const query ="SELECT*FROM com_board WHERE allow NOT IN(0)";
            db.query(query,(err,data)=>{
              if(err) reject(`${err}`);
              else{
                resolve(data);   
              }                
        });
      });
    }
    /*static admin_board(){
      return new Promise((resolve,reject)=>{
        const query = 

      });
    }*/

    static async saveBoarder(info){
        return new Promise((resolve,reject)=>{
        const query ="INSERT INTO com_board(id,title,detail,price,image,origin,amount,teainfo) VALUES(?,?,?,?,?,?,?,?);";
            db.query(query,
              [info.id,info.title,info.detail,info.price,info.image,info.origin,info.amount,info.teainfo],
              (err)=>{
              if(err) reject(`${err}`);
              else resolve({success:true});
        });
      });

      
   

    }

}
/*    static async saveBoarder(info){
        return new Promise((resolve,reject)=>{
        const query ="INSERT INTO com_board(index,id,title,detail,image,price) VALUES(?,?,?,?,?,?);";
            db.query(query,
              [info.index,info.id,info.title,info.detail,info.image,info.price],
              (err)=>{
              if(err) reject(`${err}`);
              else resolve({success:true});
        });
      });*/

module.exports =BoardStorage;

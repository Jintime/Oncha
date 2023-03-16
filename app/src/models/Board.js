"use strict";

const BoardStorage = require("./BoardStorage");

class Board{
    constructor(body){
        this.body=body;
    }      

    async board_check(){
        const client =this.body;
        try{
        const userboard= await BoardStorage.boarderInfo(client.id);
        
        if(userboard){        
        if(userboard[0].id ===client.id){
    
         return {success : true,userboard
         };
        }
      } 
      return {success:false,msg : "존재하지 않는 아이디입니다."};
     }catch(err){
         return {success :false ,err};
      }
     }

     async adminboard_check(){
        try{
        const userboard= await BoardStorage.adminboarderInfo();
        
        if(userboard){        
  
         return userboard;
        
      } 
      return {success:false,msg : "존재하지 않는 아이디입니다."};
     }catch(err){
         return {success :false ,err};
      }
     }

     async main_board(){
        try{
            const userboard= await BoardStorage.main_view();
            
            if(userboard){        
      
             return userboard;
            
          } }catch(err){
            return {success :false ,err};
         }
     }

     async board_push(){
        const client =this.body;
        try{
        const response = await BoardStorage.saveBoarder(client);
       
        return response;
        }catch(err){
            return {success : false,err };
        }
     }  

}

module.exports = Board;
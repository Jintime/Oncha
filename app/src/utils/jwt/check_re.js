"use strict";

const User = require("../../models/User");
const Board = require("../../models/Board");


module.exports = { 
   async check_board(req){
    const at = req.cookies.accessToken;
    try{
        if(at!=null){
            const user =  new User(req.body);
            const response = await user.accessToken(req.cookies.accessToken);
            
            const board = new Board(response);
            const rel = await board.board_check(response);
            const data= rel.userboard;
     
            return data;
          }else{
           
            return null;
          }
        }
    catch(err){
        console.log(err);

    }
   }

}

/*getinfo(req){
    const user = new User(req.body);
    const response = await user.accessToken(req.cookies.accessToken);
    const ne = new User(response);
    const data = await ne.getinfo();
   }*/

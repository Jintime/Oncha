"use strict";

class UserStorage{
   static #users ={
    id : ["jin","나개발","진타임"],
    password : ["1234","1234","123"],
    name:["진타임","나개발","진이"],
    email : ["wlstjd73@naver.com","wlstjd854@naver.com","wlstjd7391@gmail.com"]
};

static getUsers(...fields){
    const users =this.#users;
    const newUsers = fields.reduce((newUsers,field)=>{
        if(users.hasOwnProperty(field)){
            newUsers[field]=users[field];
        }
        return newUsers;
    },{});
    return newUsers;
 }

 static getUserInfo(id){
    const users =this.#users;
    const idx =users.id.indexOf(id);
    const userInfo =Object.keys(users).reduce((newUser,info)=>{
        newUser[info] =users[info][idx];
        return newUser;
    },{});

    return userInfo;
 }

 static save(userInfo){
    const users =this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    users.email.push(userInfo.email);
    return {success:true};
 }
}

module.exports =UserStorage;
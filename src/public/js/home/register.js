"use strict";

const id =document.querySelector("#id"),
    username =document.querySelector("#name"),
    email=document.querySelector("#email"),
    password = document.querySelector("#password"),
    confirmPassword =document.querySelector("#confirm-password"),
    registerBtn =document.querySelector("#button");

registerBtn.addEventListener("click",register);

function register(){
    const req ={
        id : id.value,
        username : username.value,
        email : email.value,
        password : password.value,
        confirmPassword : confirmPassword.value,
    };
   console.log(req);
    fetch("/register",{
        method : "post",
        headers : {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) =>res.json())
    .then((res)=>{
        if(res.success){
            location.href ='/';
        }else {
            alert(res.msg);
        }
    }).catch((err)=>{
        console.error(new Error("로그인 중 에러발생"));
    });

}
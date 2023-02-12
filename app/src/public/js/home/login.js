"use strict";

const id =document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn =document.querySelector("#button");

loginBtn.addEventListener("click",login);

function login(){
    if(!id.value)return alert("아이디를 입력해주세요.");
    if(!password.value)return alert("비밀번호를 입력해주세요.");
    
    const req ={
        id : id.value,
        password : password.value,
    };
    
    fetch("/login",{
        method : "POST",
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
"use strict";

const mypageBtn =document.querySelector(".mypage");
const registerBtn = document.querySelector(".register");
const loginBtn =document.querySelector(".loginbt");

const testadmin = document.querySelector(".shop");

const talk_bar =document.querySelector(".talk_bar");

const _order = document.querySelector(".order"),
_reservation =document.querySelector(".reservation"),
_coupon =document.querySelector(".coupon"),
_intro =document.querySelector(".intro"),
_notification =document.querySelector(".notification"),
_faq =document.querySelector(".faq"),
_csc =document.querySelector(".csc"),
_inquiry =document.querySelector(".inquiry"),
mypage2Btn =document.querySelector(".mypage2");


_order.addEventListener("click",()=>getmt(`order`));
_reservation.addEventListener("click",()=>getmt(`reservation`));
_coupon.addEventListener("click",()=>getmt(`coupon`));
_intro.addEventListener("click",()=>getmt(`intro`));
_notification.addEventListener("click",()=>getmt(`notification`));
_faq.addEventListener("click",()=>getmt(`faq`));
_csc.addEventListener("click",talk);
_inquiry.addEventListener("click",()=>getmt(`inquiry`));
mypage2Btn.addEventListener("click",()=>getmt(`mypage`));




testadmin.addEventListener("click",()=>getmt(`write`));

registerBtn.addEventListener("click",()=>getmt(`register`));
loginBtn.addEventListener("click",()=>getmt(`login`));

mypageBtn.addEventListener("click",()=>getmt(`mypage`));



//test
const test_btn = document.querySelector(".test");

test_btn.addEventListener("click",()=>getmt(`order_test`));

function  getmt (value){
    const test = `/${value}`;
    console.log(test);
     fetch(`/${value}`,{
        method : "GET",
        headers : {
            "Content-Type":"application/json"
        },
    })
    .then(()=>{
        location.href =`/${value}`;
        
    })
   .catch((err)=>{
        console.error(new Error(`${value} 에러`));
    });

}


function talk(){
    if( talk_bar.style.visibility=="hidden")talk_bar.style.visibility="visible";
    else talk_bar.style.visibility="hidden";
   
    /*if(_csc.classList.contains("hide"))_csc.classList.remove("hide");
    else _csc.classList.add("hide");*/
}
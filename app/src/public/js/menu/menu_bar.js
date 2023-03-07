"use strict";

const _order = document.querySelector(".order_history"),
_reservation =document.querySelector(".review"),
_coupon =document.querySelector(".coupon"),
_intro =document.querySelector(".like"),
_notification =document.querySelector(".notification"),
_faq =document.querySelector(".faq"),
_csc =document.querySelector(".csc"),
_inquiry =document.querySelector(".inquiry"),
mypageBtn =document.querySelector(".mypage");



_order.addEventListener("click",()=>getmt(`order`));
_reservation.addEventListener("click",()=>getmt(`reservation`));
_coupon.addEventListener("click",()=>getmt(`coupon`));
_intro.addEventListener("click",()=>getmt(`intro`));
_notification.addEventListener("click",()=>getmt(`notification`));
_faq.addEventListener("click",()=>getmt(`faq`));
_csc.addEventListener("click",talk);
_inquiry.addEventListener("click",()=>getmt(`inquiry`));
mypage2Btn.addEventListener("click",()=>getmt(`mypage`));




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
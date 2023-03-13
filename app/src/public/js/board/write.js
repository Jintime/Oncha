"use strict";


const title = document.querySelector(".tilte"),
    userid = document.querySelector("#userid"),
    cont = document.querySelector(".content"),
    pushBt = document.querySelector(".on"),
    image =document.querySelector(".image"),
    _price =document.querySelector(".price");


pushBt.addEventListener("click",board_push);

if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(position){   
    userid.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; 
    console.log(position); //client side JS will never print to your terminal.  It only prints to the browser.
    }); 
} else userid.innerHTML = "Geolocation is not supported by this browser.";


 function board_push () {
    if(!title.value)return alert("제목을 입력해주세요.");
    if(!cont.value)return alert("내용을 입력해주세요.");
    

   const lastindex = image.value.split("\\");
   const nArLength = lastindex.length;
   const filename= lastindex[nArLength-1]; 

    const req = {
        id : userid.value,
        title : title.value,
        detail : cont.value,
        price: _price.value,
        image : `img/${filename}`,

    }

    fetch("/write",{
        method : "POST",
        headers : {
            "Content-Type":"application/json"
        },
        body : JSON.stringify(req)
        
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            location.href = "/write";
        }else{
            alert(res.msg);
        }
    }).catch((err)=>{
        console.error(new Error(err+"작성중 에러 발생"))
    });

}


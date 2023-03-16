"use strict";

let Slide = document.querySelector("#Gift_container");
let SlideImage = document.querySelectorAll("#Gift_container li");


let currenIndex = 0;

let slideCount = SlideImage.length-1;

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const slideWidht = 300;
const slideMargin=100;

makeclone();
initFunction();


function makeclone(){
    let clonSlide_first =SlideImage[0].cloneNode(true);
    let cloneSlide_last =Slide.lastElementChild.cloneNode(true);
    
    Slide.append(clonSlide_first);
    Slide.insertBefore(cloneSlide_last,Slide.firstElementChild);
}

function initFunction(){
    Slide.style.width = (slideWidht+slideMargin)*(slideCount+4)+'px';

}
next.addEventListener('click',function(){
    console.log(currenIndex);
    if(currenIndex <= slideCount){
        Slide.style.left = -(currenIndex)*(slideWidht+slideMargin)+'px';
        Slide.style.transition = `${0.5}s ease-out`;
    }
    if(currenIndex ===slideCount){
        setTimeout(() => {
            Slide.style.left = 0+'px';
            Slide.style.transition =`${0}s ease-out`;
        }, 500);
        currenIndex=-1;
    }
    currenIndex +=1;
});
prev.addEventListener('click',()=>{
    console.log(currenIndex);
    if(currenIndex>=0){
        Slide.style.left=-currenIndex*(slideWidht+slideMargin)+'px';
         Slide.style.transition = `${0.5}s ease-out`;
    }
    if(currenIndex ===0){
        setTimeout(() => {
            Slide.style.left = -slideCount*(slideWidht+slideMargin)+'px';
            Slide.style.transition = `${0}s ease-out`;
        }, 500);
        currenIndex =slideCount;
    }
    currenIndex-=1;
});


//////////////////////////////////////////////////////////스크롤확인///////////
let header = document.querySelector("#navbar_container");
let headerHeight = header.offsetHeight+150;

window.onscroll = function () {
  let windowTop = window.scrollY;
  	// 스크롤 세로값이 헤더높이보다 크거나 같으면 
	// 헤더에 클래스 'drop'을 추가한다
  if (windowTop >= headerHeight) {
    header.classList.add("drop");
  } 
  // 아니면 클래스 'drop'을 제거
  else {
    header.classList.remove("drop");
 
  }
};
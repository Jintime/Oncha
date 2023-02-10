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
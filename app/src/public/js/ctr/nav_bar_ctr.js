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
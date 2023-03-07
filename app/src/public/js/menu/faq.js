"use strict";

var button =document.getElementsByClassName("button");

let i;

for (i=0;i<button.length;i++) {
  button[i].addEventListener("click", function()
  {
    this.classList.toggle("active");
    var article = this.nextElementSibling;
    if (article.style.display === "block") {
      article.style.display = "none";
    } else {
      article.style.display = "block";
    }
  })
}
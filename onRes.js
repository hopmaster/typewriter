/**
 * жестоко адаптируем размер шрифта
*/
window.onresize = function (){

    "use strict";

    var width= typeWriter.width = document.documentElement.clientWidth;
    var height=document.documentElement.clientHeight;

    typeWriter.text.style.fontSize=((typeWriter.width*1.7)/typeWriter.text.textContent.length)+"px";
    typeWriter.text.style.top = height/2 + "px";
    typeWriter.header.style.fontSize=(width/70)+"px";
    typeWriter.logo.style.fontSize=(width/20)+"px";
    typeWriter.info.style.fontSize=(width/43)+"px";
    typeWriter.letter.style.fontSize=(width/20)+"px";
    typeWriter.animate.style.fontSize = (width/30)+"px";
    typeWriter.information.style.fontSize = (width/60)+"px";
    typeWriter.titleLetters.style.fontSize = (width/90)+"px";

};


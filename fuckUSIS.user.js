// ==UserScript==
// @name         Fuck Usis
// @namespace    http://usis.yildiz.edu.tr/
// @version      0.1
// @description  Remove stupid restrictions
// @author       Mikchan
// @match        http://usis.yildiz.edu.tr/*
// @grant        none
// @require https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

$(document).ready(function(){
    $("body").attr("onload","LoadUSIS();");
    $("body").attr("onunload","");
});

(function() {
    document.oncontextmenu=new Function("");
    document.onmousedown = null;
    
    counter = Infinity;
    
    function LoadUSIS(){
        if(window.location.pathname == '/podcast') {
            window.location.replace("/main.jsp");
        }
    }
    
    this.name = "USIS";
})();

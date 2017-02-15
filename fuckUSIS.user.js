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
    
        if(window.location.pathname == '/CrsListOfferedCoursesPrint.jsp') {
        $("tr").slice(2).each(function(){
            $(this).children("td:eq(4)").each(function(){
                var its = $(this).text();
                its = its.split("/");
                if(parseInt(its[0]) >= parseInt(its[1]))
                    $(this).parent().remove();
            });
        });
        
        if($("tr").length > 2)
            $('body').append('<embed src="https://wav-library.net/sfx/mix/AirRaidSirenAlert.mp3" autostart="true" hidden="true" loop="false">');
        
        setTimeout(function(){
            window.location.reload(1);
        }, 5000);
    }
    
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

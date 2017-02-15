// ==UserScript==
// @name         Fuck Usis
// @namespace    http://usis.yildiz.edu.tr/
// @version      1.2
// @description  Remove stupid restrictions
// @author       Mikchan
// @match        http://usis.yildiz.edu.tr/*
// @grant        none
// @require https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

$(document).ready(function(){
    if(window.location.pathname != '/index.jsp' || window.location.pathname != '/main.jsp' || window.location.pathname != '/') {
        var c_name = "JSESSIONID";
        var c_value = getCookie(c_name);
        var exdays = 1;
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        document.cookie=encodeURIComponent(c_name) + "=" + encodeURIComponent(c_value) + (!exdays ? "" : "; expires="+exdate.toUTCString());
    }

    
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
    
    if(window.location.pathname == '/StdEnrollCourse.do') {
        $("table").slice(37).first().append('<iframe name="CrsListOfferedCoursesPrint" src="CrsListOfferedCoursesPrint.jsp" width="760" height="150"></iframe>');
    }
    
});

function LoadUSIS(){
    if(window.location.pathname == '/index.jsp' || window.location.pathname == '/main.jsp' || window.location.pathname == '/') {
        window.location.replace("/main.jsp");
    }
}

(function() {
    document.oncontextmenu=new Function("");
    document.onmousedown = null;
    
    counter = Infinity;
    
    this.name = "USIS";
})();

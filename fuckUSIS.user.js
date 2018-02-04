// ==UserScript==
// @name         Fuck Usis
// @namespace    http://usis.yildiz.edu.tr/
// @version      0.2
// @description  Remove stupid restrictions
// @author       Mikchan
// @match        http://usis.yildiz.edu.tr/*
// @grant        none
// @require https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function remove_dat_shit(){
    $("tr").slice(2).each(function(){
        $(this).children("td:eq(4)").each(function(){
            var its = $(this).text();
            its = its.split("/");
            if(parseInt(its[0]) == parseInt(its[1]))
                $(this).parent().remove();
        });
    });
}

$(document).ready(function(){
    if(window.location.pathname != '/index.jsp' && window.location.pathname != '/main.jsp' && window.location.pathname != '/') {
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
        remove_dat_shit();
        //if($("tr").length > 2)
            //$('body').append('<embed src="https://wav-library.net/sfx/mix/AirRaidSirenAlert.mp3" autostart="true" hidden="true" loop="false">');
        
        setInterval(function () {
            $('html').fadeOut(10, function() {
                $(this).load('/CrsListOfferedCoursesPrint.jsp', function() {
                    remove_dat_shit();
                    $(this).fadeIn(10);
                });
            });
        }, 5000);

    }
    
    if(window.location.pathname == '/StdEnrollCourse.do') {
        $("table").slice(37).first().append('<iframe name="CrsListOfferedCoursesPrint" src="CrsListOfferedCoursesPrint.jsp" width="760" height="150"></iframe>');
    }
  
    document.oncontextmenu=new Function("");
    document.onmousedown = null;

    counter = 100 * 365 * 24 * 60 * 60; //100 sene yeter mi?
    
    this.name = "USIS";
});

function LoadUSIS(){
    if(window.location.pathname == '/index.jsp' || window.location.pathname == '/main.jsp' || window.location.pathname == '/') {
        window.location.replace("/main.jsp");
    }
}

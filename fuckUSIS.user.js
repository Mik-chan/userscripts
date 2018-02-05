// ==UserScript==
// @name         Fuck Usis
// @namespace    http://usis.yildiz.edu.tr/
// @version      1.0
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
        var exdays = 365 * 100;
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

        updateList();
    }

    if(window.location.pathname == '/StdEnrollCourse.do') {
        $("table").slice(37).first().append('<iframe id="iframe_list" name="CrsListOfferedCoursesPrint" src="CrsListOfferedCoursesPrint.jsp" width="760" height="150"></iframe>');
    }

    document.oncontextmenu= function(){};
    document.onmousedown = null;

    counter = 100 * 365 * 24 * 60 * 60; //100 sene yeter mi?

    this.name = "USIS";

    addJS_Node(LoadUSIS);
});

function LoadUSIS(){
    if(window.location.pathname == '/index.jsp' || window.location.pathname == '/') {
        window.location.replace("/main.jsp");
    }
}

function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

function updateList()
{
    container = $('#iframe_list');

    request_page="CrsListOfferedCoursesPrint.jsp";

    time = 2;

    req = $.ajax({url:request_page,type:"GET",dataType:"HTML"});

    req.done(function(result)
             {
        container.html(result);
        setInterval(function(){
            updateList();
        }, 5000);
    });
}

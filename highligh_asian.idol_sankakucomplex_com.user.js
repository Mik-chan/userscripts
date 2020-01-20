// ==UserScript==
// @name         Highligh Asian
// @namespace    mikchan
// @version      1.0
// @description  Highlighs content with asians on Idol Complex
// @author       https://github.com/Mik-chan
// @match        https://idol.sankakucomplex.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.js
// ==/UserScript==

var $j = jQuery.noConflict();

function is_asian(title) {
    let allow_tags = [
        "asian", "japanese", "chinese", "vietnamese", "thai",
        "ems-", "utirusu", "tachikawa_rie", "iori_moe", "kawasaki_aya", "yurisa_(ii)", "cutecat"
    ];

    let disallow_tags = [
        "non-asian", "caucasian", "non_asian"
    ];

    let allow_regex = [
        /^(?!User\:).+(?=[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf\u3131-\uD79D]).+$/
    ];

    let disallow_regex = [
        // /^User\:.+/
    ];

    let res = false;
    const lst = title.split(' ');
    lst.forEach(function(tag) {
        let test_true_title = allow_tags.some((v) => tag.includes(v));
        let test_true_regex = allow_regex.some((v) => v.test(tag));
        let test_false_title = disallow_tags.some((v) => tag.includes(v));
        let test_disallow_regex = false; //disallow_tags.some((v) => v.test(title));

        res |= (test_true_title || test_true_regex) && !(test_false_title || test_disallow_regex);
    });


    return res;
}

function tag_asians() {
    $j(".preview").each(function(){
        var title = $j(this).attr("title");
        if(is_asian(title)) {
            $j(this).css("box-shadow", "0 0 12px 2px violet");
        }
    });
}

$j(window).scroll(function() {
    if($j(window).scrollTop() + $j(window).height() > $j(document).height() - 100) {
        tag_asians();
    }
});

(function() {
    'use strict';
    tag_asians();
})();

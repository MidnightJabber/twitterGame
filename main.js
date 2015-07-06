/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {
    $('.linkOne').click(function (data) {
        console.log("link: ");
        console.log(data);
        $(this).siblings('.imgOne').slideToggle('fast');
        $(this).siblings('.imgTwo').hide();
    });

    $('.linkTwo').click(function() {
        $(this).siblings('.imgTwo').slideToggle('fast');
        $(this).siblings('.imgOne').hide();
    });

    $('.tweetCard').click(function (event) {
        console.log("\n\ntweetCard: " + event);
        console.log((event.toElement.className));
        console.log((event.toElement.className).indexOf('imgLink'));    //Detecting if click in tweetcard was on the imgLink class
        

        var clickedClassName = event.toElement.className;
        if (clickedClassName.indexOf('imgLink') < 0 ) {
            //click happened in tweetCard but not on image links
            console.log('click happened in tweetCard but not on image links');
        } else {
            //click happened in tweetCard and on image links
            console.log('click happened in tweetCard and on image links');
        }

    });
});
/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {
    $('.linkOne').click(function(data) {
        console.log(data);
        $(this).siblings('.imgOne').slideToggle('fast');
        $(this).siblings('.imgTwo').hide();
    });

    $('.linkTwo').click(function() {
        $(this).siblings('.imgTwo').slideToggle('fast');
        $(this).siblings('.imgOne').hide();
    });
});
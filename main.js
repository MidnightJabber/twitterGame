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

    // Start the Game Count-Down Timer
    $('.countDownTimer').TimeCircles({ time: {
	    Days: { color: "#C0C8CF", show: false},
	    Hours: { color: "#C0C8CF", show: false },
	    Minutes: { color: "#C0C8CF", show: false },
	    Seconds: { color: "#1dcaff", show: true }
	}}); 

});
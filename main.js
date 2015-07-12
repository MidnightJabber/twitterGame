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

    /**
     * Function generates a table containing Twitter Users and their randomized tweets.
     * Function also appends this table to the <body> on the front-end
     * @param  {[JSON]} tableContentJSON: JSON object containing the userInfo and tweetInfo (correct and incorrect)
     */
    function createTable(tableContentJSON) {
        html = '<table class="table">\n';
        html = html + '    <thead>\n';
        html = html + '        <tr>\n';
        html = html + '            <th>\n' + 'Userhtml' + '</th>\n';
        html = html + '            <th>\n' + 'tweethtml' + '</th>\n';
        html = html + '        </tr>\n';
        html = html + '    </thead>\n';

        html = html + '    <tbody>\n';
        $.each(tableContentJSON['incorrect'], function(key, element) {
            html = html + '        <tr>\n';
            html = html + '            <td>\n';
            html = html + '                <div class="userCard">\n';
            html = html + '                    <div class="userImg">\n';
            html = html + '                        <img src="' + element['userInfo']['profilePicURL'] + '">\n';
            html = html + '                    </div>\n';
        
            html = html + '                    <div class="userInfo">\n';
            html = html + '                        <div class="userName">' + element['userInfo']['name'] + '</div>\n';
            html = html + '                        <div class="userHandle">' + element['userInfo']['handle'] + '</div>\n';
            html = html + '                    </div>\n';
        
            html = html + '                    <a class="followButton" href="' + element['userInfo']['followURL'] + '">\n';
            html = html + '                        <span class="fa fa-twitter"></span>\n';
            html = html + '                        <p class="text">Follow</p>\n';
            html = html + '                    </a>\n';
            html = html + '                </div>\n';
            html = html + '            </td>\n';

            html = html + '            <td>\n';
            html = html + '                <div class="tweetCard">\n';
            html = html + element['tweetInfo']['tweetHTML'];
            html = html + '                </div>\n';
            html = html + '            </td>\n';
            html = html + '        </tr>\n';
        });

        html = html + '    </tbody>\n';
        html = html + '</table>\n';

        $('body').append(html);
    }
});
/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {


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

    var peopleJSON = 
{
    "correct": 
    {
        "zaynmalik": {
            "userInfo": {
                "name": "zaynmalik",
                "handle": "@zaynmalik",
                "profilePicURL": "http://pbs.twimg.com/profile_images/616004209817862144/MquoUnkS.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@zaynmalik"
            },
            "tweetInfo": {
                "tweetID": 608555658510782500,
                "tweetDate": "Wed Jun 10 08:45:50 +0000 2015",
                "tweetHTML": "<p>White hair <div class=\"imgLink linkOne\">http://t.co/77q89RfxhS<\/div><img class=\"tweetImg imgOne\" width=\"450px\" style=\"display: none;\" height=\"auto\" src=\"http://pbs.twimg.com/media/CHIGI-DW4AANQwu.jpg\"><\/p>",
                "tweetText": "White hair http://t.co/77q89RfxhS",
                "numOfRetweets": 162239,
                "numOfFavorites": 242932
            }
        },

        "StephenAtHome": {
            "userInfo": {
                "name": "Stephen Colbert",
                "handle": "@StephenAtHome",
                "profilePicURL": "http://pbs.twimg.com/profile_images/593935800712175616/Fo__NcxJ.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@StephenAtHome"
            },
            "tweetInfo": {
                "tweetID": 532941261494579200,
                "tweetDate": "Thu Nov 13 17:01:12 +0000 2014",
                "tweetHTML": "<p>Yahoo! just bought an online ad platform for $640M, great news for everyone who thought Yahoo! just needed more ads.<\/p>",
                "tweetText": "Yahoo! just bought an online ad platform for $640M, great news for everyone who thought Yahoo! just needed more ads.",
                "numOfRetweets": 481,
                "numOfFavorites": 993
            }
        },

        "Drake": {
            "userInfo": {
                "name": "Drizzy",
                "handle": "@Drake",
                "profilePicURL": "http://pbs.twimg.com/profile_images/563843814725402624/Vb8k670S.png",
                "followURL": "https://twitter.com/intent/follow?screen_name=@Drake"
            },
            "tweetInfo": {
                "tweetID": 416820775098662900,
                "tweetDate": "Sat Dec 28 06:39:51 +0000 2013",
                "tweetHTML": "<p>The only thing I'm seeing I'd like to put an amend on...perhaps a little more room here for the fixinsssss - Kenny Powers<\/p>",
                "tweetText": "The only thing I'm seeing I'd like to put an amend on...perhaps a little more room here for the fixinsssss - Kenny Powers",
                "numOfRetweets": 7868,
                "numOfFavorites": 9129
            }
        },

        "katyperry": {
            "userInfo": {
                "name": "KATY PERRY",
                "handle": "@katyperry",
                "profilePicURL": "http://pbs.twimg.com/profile_images/609748341119844352/7dUd606e.png",
                "followURL": "https://twitter.com/intent/follow?screen_name=@katyperry"
            },
            "tweetInfo": {
                "tweetID": 579089744568578000,
                "tweetDate": "Sat Mar 21 01:18:48 +0000 2015",
                "tweetHTML": "<p>☁️❄️<a class=\"webLink\" target=\"_blank\" href=\"https://soundcloud.com/kevinogarrett/control\">https://t.co/FUIWZVlJ1V<\/a>❄️☁️ <div class=\"imgLink linkOne\">http://t.co/tDpQBvqit8<\/div><img class=\"tweetImg imgOne\" width=\"450px\" style=\"display: none;\" height=\"auto\" src=\"http://pbs.twimg.com/media/CAlXBbAVAAEPpEX.jpg\"><\/p>",
                "tweetText": "☁️❄️https://t.co/FUIWZVlJ1V❄️☁️ http://t.co/tDpQBvqit8",
                "numOfRetweets": 5261,
                "numOfFavorites": 12325
            }
        },

        "TreySongz": {
            "userInfo": {
                "name": "Trey Songz",
                "handle": "@TreySongz",
                "profilePicURL": "http://pbs.twimg.com/profile_images/562818271687495681/n2FuIK6x.jpeg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@TreySongz"
            },
            "tweetInfo": {
                "tweetID": 610519437175697400,
                "tweetDate": "Mon Jun 15 18:49:11 +0000 2015",
                "tweetHTML": "<p>Peep <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/SlowMotion?src=hash\">#SlowMotion<\/a> featured on <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/Spotify\">@Spotify<\/a>’s ‘Today’s Top Hits’ playlist <a class=\"webLink\" target=\"_blank\" href=\"http://spoti.fi/1rhnAlP\">http://t.co/UcOP0foabH<\/a><\/p>",
                "tweetText": "Peep #SlowMotion featured on @Spotify’s ‘Today’s Top Hits’ playlist http://t.co/UcOP0foabH",
                "numOfRetweets": 268,
                "numOfFavorites": 525
            }
        },

        "azizansari": {
            "userInfo": {
                "name": "Aziz Ansari",
                "handle": "@azizansari",
                "profilePicURL": "http://pbs.twimg.com/profile_images/421377161/azizlittletwitter.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@azizansari"
            },
            "tweetInfo": {
                "tweetID": 611243405910388700,
                "tweetDate": "Wed Jun 17 18:45:58 +0000 2015",
                "tweetHTML": "<p>Twitter Q&amp;A. Ask me stuff. Tag it <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/ModernRomanceQandA?src=hash\">#ModernRomanceQandA<\/a> and get the book here: <a class=\"webLink\" target=\"_blank\" href=\"http://book.azizansari.com\">http://t.co/kztneKCBsB<\/a><\/p>",
                "tweetText": "Twitter Q&amp;A. Ask me stuff. Tag it #ModernRomanceQandA and get the book here: http://t.co/kztneKCBsB",
                "numOfRetweets": 20,
                "numOfFavorites": 71
            }
        },

        "tyrabanks": {
            "userInfo": {
                "name": "Tyra Banks",
                "handle": "@tyrabanks",
                "profilePicURL": "http://pbs.twimg.com/profile_images/607921435110088704/ShktIWxi.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@tyrabanks"
            },
            "tweetInfo": {
                "tweetID": 592498970464686100,
                "tweetDate": "Mon Apr 27 01:22:17 +0000 2015",
                "tweetHTML": "<p>Who caught Tyra's <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/BankSigns?src=hash\">#BankSigns<\/a> drop at the start of the show? �� <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/Fierce200?src=hash\">#Fierce200<\/a> <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/DaytimeEmmys?src=hash\">#DaytimeEmmys<\/a> - Team TyTy<\/p>",
                "tweetText": "Who caught Tyra's #BankSigns drop at the start of the show? �� #Fierce200 #DaytimeEmmys - Team TyTy",
                "numOfRetweets": 44,
                "numOfFavorites": 183
            }
        },

        "davidguetta": {
            "userInfo": {
                "name": "David Guetta",
                "handle": "@davidguetta",
                "profilePicURL": "http://pbs.twimg.com/profile_images/535477460054208513/Vq47wekj.jpeg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@davidguetta"
            },
            "tweetInfo": {
                "tweetID": 593487405765816300,
                "tweetDate": "Wed Apr 29 18:49:58 +0000 2015",
                "tweetHTML": "<p>Talked w <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/kingsthings\">@kingsthings<\/a> about <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/Coachella?src=hash\">#Coachella<\/a> <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/NICKIMINAJ\">@NICKIMINAJ<\/a> &amp; <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/Beyonce\">@Beyonce<\/a>. Think Larry &amp; I should collab? <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/OraTV\">@OraTV<\/a>: <a class=\"webLink\" target=\"_blank\" href=\"http://www.ora.tv/larrykingnow/david-guetta-rare-interview-larry-king-0_75bkpbkqki3f\">http://t.co/vgmArNw6DT<\/a> <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/LarryKingNow?src=hash\">#LarryKingNow<\/a><\/p>",
                "tweetText": "Talked w @kingsthings about #Coachella @NICKIMINAJ &amp; @Beyonce. Think Larry &amp; I should collab? @OraTV: http://t.co/vgmArNw6DT #LarryKingNow",
                "numOfRetweets": 299,
                "numOfFavorites": 549
            }
        },

        "KevinHart4real": {
            "userInfo": {
                "name": "Kevin Hart",
                "handle": "@KevinHart4real",
                "profilePicURL": "http://pbs.twimg.com/profile_images/568041122765606912/APfVoUzX.jpeg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@KevinHart4real"
            },
            "tweetInfo": {
                "tweetID": 619847064260857900,
                "tweetDate": "Sat Jul 11 12:33:50 +0000 2015",
                "tweetHTML": "<p>LIVE on <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/Periscope?src=hash\">#Periscope<\/a>: A quick <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/HartaScope?src=hash\">#HartaScope<\/a> Before my 5K run in Brooklyn NY <a class=\"webLink\" target=\"_blank\" href=\"https://www.periscope.tv/w/aHEErjEzNTQ4MXwzNzc5NzQzMe1bwfzm6smQhKKQVB_bHNsx0-dAdGrnVieeNSWnK5Z_\">https://t.co/6OcGj83cMA<\/a><\/p>",
                "tweetText": "LIVE on #Periscope: A quick #HartaScope Before my 5K run in Brooklyn NY https://t.co/6OcGj83cMA",
                "numOfRetweets": 39,
                "numOfFavorites": 201
            }
        },

        "rihanna": {
            "userInfo": {
                "name": "Rihanna",
                "handle": "@rihanna",
                "profilePicURL": "http://pbs.twimg.com/profile_images/582747937958076418/ZrNhtrD2.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@rihanna"
            },
            "tweetInfo": {
                "tweetID": 606056415891976200,
                "tweetDate": "Wed Jun 03 11:14:44 +0000 2015",
                "tweetHTML": "<p>Chile!!! Can’t wait to see you September 29. Find more info here —&gt; <a class=\"webLink\" target=\"_blank\" href=\"http://transistor.cl/rihanna\">http://t.co/oL1Y5A4ZN3<\/a> <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/RihannaEnChile?src=hash\">#RihannaEnChile<\/a><\/p>",
                "tweetText": "Chile!!! Can’t wait to see you September 29. Find more info here —&gt; http://t.co/oL1Y5A4ZN3 #RihannaEnChile",
                "numOfRetweets": 8316,
                "numOfFavorites": 12251
            }
        }
    },

    "incorrect": 
    {
        "zaynmalik": {
            "userInfo": {
                "name": "zaynmalik",
                "handle": "@zaynmalik",
                "profilePicURL": "http://pbs.twimg.com/profile_images/616004209817862144/MquoUnkS.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@zaynmalik"
            },
            "tweetInfo": {
                "tweetID": 416820775098662900,
                "tweetDate": "Sat Dec 28 06:39:51 +0000 2013",
                "tweetHTML": "<p>The only thing I'm seeing I'd like to put an amend on...perhaps a little more room here for the fixinsssss - Kenny Powers<\/p>",
                "tweetText": "The only thing I'm seeing I'd like to put an amend on...perhaps a little more room here for the fixinsssss - Kenny Powers",
                "numOfRetweets": 7868,
                "numOfFavorites": 9129
            }
        },

        "StephenAtHome": {
            "userInfo": {
                "name": "Stephen Colbert",
                "handle": "@StephenAtHome",
                "profilePicURL": "http://pbs.twimg.com/profile_images/593935800712175616/Fo__NcxJ.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@StephenAtHome"
            },
            "tweetInfo": {
                "tweetID": 610519437175697400,
                "tweetDate": "Mon Jun 15 18:49:11 +0000 2015",
                "tweetHTML": "<p>Peep <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/SlowMotion?src=hash\">#SlowMotion<\/a> featured on <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/Spotify\">@Spotify<\/a>’s ‘Today’s Top Hits’ playlist <a class=\"webLink\" target=\"_blank\" href=\"http://spoti.fi/1rhnAlP\">http://t.co/UcOP0foabH<\/a><\/p>",
                "tweetText": "Peep #SlowMotion featured on @Spotify’s ‘Today’s Top Hits’ playlist http://t.co/UcOP0foabH",
                "numOfRetweets": 268,
                "numOfFavorites": 525
            }
        },

        "Drake": {
            "userInfo": {
                "name": "Drizzy",
                "handle": "@Drake",
                "profilePicURL": "http://pbs.twimg.com/profile_images/563843814725402624/Vb8k670S.png",
                "followURL": "https://twitter.com/intent/follow?screen_name=@Drake"
            },
            "tweetInfo": {
                "tweetID": 579089744568578000,
                "tweetDate": "Sat Mar 21 01:18:48 +0000 2015",
                "tweetHTML": "<p>☁️❄️<a class=\"webLink\" target=\"_blank\" href=\"https://soundcloud.com/kevinogarrett/control\">https://t.co/FUIWZVlJ1V<\/a>❄️☁️ <div class=\"imgLink linkOne\">http://t.co/tDpQBvqit8<\/div><img class=\"tweetImg imgOne\" width=\"450px\" style=\"display: none;\" height=\"auto\" src=\"http://pbs.twimg.com/media/CAlXBbAVAAEPpEX.jpg\"><\/p>",
                "tweetText": "☁️❄️https://t.co/FUIWZVlJ1V❄️☁️ http://t.co/tDpQBvqit8",
                "numOfRetweets": 5261,
                "numOfFavorites": 12325
            }
        },

        "katyperry": {
            "userInfo": {
                "name": "KATY PERRY",
                "handle": "@katyperry",
                "profilePicURL": "http://pbs.twimg.com/profile_images/609748341119844352/7dUd606e.png",
                "followURL": "https://twitter.com/intent/follow?screen_name=@katyperry"
            },
            "tweetInfo": {
                "tweetID": 579089744568578000,
                "tweetDate": "Sat Mar 21 01:18:48 +0000 2015",
                "tweetHTML": "<p>☁️❄️<a class=\"webLink\" target=\"_blank\" href=\"https://soundcloud.com/kevinogarrett/control\">https://t.co/FUIWZVlJ1V<\/a>❄️☁️ <div class=\"imgLink linkOne\">http://t.co/tDpQBvqit8<\/div><img class=\"tweetImg imgOne\" width=\"450px\" style=\"display: none;\" height=\"auto\" src=\"http://pbs.twimg.com/media/CAlXBbAVAAEPpEX.jpg\"><\/p>",
                "tweetText": "☁️❄️https://t.co/FUIWZVlJ1V❄️☁️ http://t.co/tDpQBvqit8",
                "numOfRetweets": 5261,
                "numOfFavorites": 12325
            }
        },

        "TreySongz": {
            "userInfo": {
                "name": "Trey Songz",
                "handle": "@TreySongz",
                "profilePicURL": "http://pbs.twimg.com/profile_images/562818271687495681/n2FuIK6x.jpeg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@TreySongz"
            },
            "tweetInfo": {
                "tweetID": 416820775098662900,
                "tweetDate": "Sat Dec 28 06:39:51 +0000 2013",
                "tweetHTML": "<p>The only thing I'm seeing I'd like to put an amend on...perhaps a little more room here for the fixinsssss - Kenny Powers<\/p>",
                "tweetText": "The only thing I'm seeing I'd like to put an amend on...perhaps a little more room here for the fixinsssss - Kenny Powers",
                "numOfRetweets": 7868,
                "numOfFavorites": 9129
            }
        },

        "azizansari": {
            "userInfo": {
                "name": "Aziz Ansari",
                "handle": "@azizansari",
                "profilePicURL": "http://pbs.twimg.com/profile_images/421377161/azizlittletwitter.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@azizansari"
            },
            "tweetInfo": {
                "tweetID": 610519437175697400,
                "tweetDate": "Mon Jun 15 18:49:11 +0000 2015",
                "tweetHTML": "<p>Peep <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/SlowMotion?src=hash\">#SlowMotion<\/a> featured on <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/Spotify\">@Spotify<\/a>’s ‘Today’s Top Hits’ playlist <a class=\"webLink\" target=\"_blank\" href=\"http://spoti.fi/1rhnAlP\">http://t.co/UcOP0foabH<\/a><\/p>",
                "tweetText": "Peep #SlowMotion featured on @Spotify’s ‘Today’s Top Hits’ playlist http://t.co/UcOP0foabH",
                "numOfRetweets": 268,
                "numOfFavorites": 525
            }
        },

        "tyrabanks": {
            "userInfo": {
                "name": "Tyra Banks",
                "handle": "@tyrabanks",
                "profilePicURL": "http://pbs.twimg.com/profile_images/607921435110088704/ShktIWxi.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@tyrabanks"
            },
            "tweetInfo": {
                "tweetID": 579089744568578000,
                "tweetDate": "Sat Mar 21 01:18:48 +0000 2015",
                "tweetHTML": "<p>☁️❄️<a class=\"webLink\" target=\"_blank\" href=\"https://soundcloud.com/kevinogarrett/control\">https://t.co/FUIWZVlJ1V<\/a>❄️☁️ <div class=\"imgLink linkOne\">http://t.co/tDpQBvqit8<\/div><img class=\"tweetImg imgOne\" width=\"450px\" style=\"display: none;\" height=\"auto\" src=\"http://pbs.twimg.com/media/CAlXBbAVAAEPpEX.jpg\"><\/p>",
                "tweetText": "☁️❄️https://t.co/FUIWZVlJ1V❄️☁️ http://t.co/tDpQBvqit8",
                "numOfRetweets": 5261,
                "numOfFavorites": 12325
            }
        },

        "davidguetta": {
            "userInfo": {
                "name": "David Guetta",
                "handle": "@davidguetta",
                "profilePicURL": "http://pbs.twimg.com/profile_images/535477460054208513/Vq47wekj.jpeg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@davidguetta"
            },
            "tweetInfo": {
                "tweetID": 416820775098662900,
                "tweetDate": "Sat Dec 28 06:39:51 +0000 2013",
                "tweetHTML": "<p>The only thing I'm seeing I'd like to put an amend on...perhaps a little more room here for the fixinsssss - Kenny Powers<\/p>",
                "tweetText": "The only thing I'm seeing I'd like to put an amend on...perhaps a little more room here for the fixinsssss - Kenny Powers",
                "numOfRetweets": 7868,
                "numOfFavorites": 9129
            }
        },

        "KevinHart4real": {
            "userInfo": {
                "name": "Kevin Hart",
                "handle": "@KevinHart4real",
                "profilePicURL": "http://pbs.twimg.com/profile_images/568041122765606912/APfVoUzX.jpeg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@KevinHart4real"
            },
            "tweetInfo": {
                "tweetID": 608555658510782500,
                "tweetDate": "Wed Jun 10 08:45:50 +0000 2015",
                "tweetHTML": "<p>White hair <div class=\"imgLink linkOne\">http://t.co/77q89RfxhS<\/div><img class=\"tweetImg imgOne\" width=\"450px\" style=\"display: none;\" height=\"auto\" src=\"http://pbs.twimg.com/media/CHIGI-DW4AANQwu.jpg\"><\/p>",
                "tweetText": "White hair http://t.co/77q89RfxhS",
                "numOfRetweets": 162239,
                "numOfFavorites": 242932
            }
        },

        "rihanna": {
            "userInfo": {
                "name": "Rihanna",
                "handle": "@rihanna",
                "profilePicURL": "http://pbs.twimg.com/profile_images/582747937958076418/ZrNhtrD2.jpg",
                "followURL": "https://twitter.com/intent/follow?screen_name=@rihanna"
            },
            "tweetInfo": {
                "tweetID": 608555658510782500,
                "tweetDate": "Wed Jun 10 08:45:50 +0000 2015",
                "tweetHTML": "<p>White hair <div class=\"imgLink linkOne\">http://t.co/77q89RfxhS<\/div><img class=\"tweetImg imgOne\" width=\"450px\" style=\"display: none;\" height=\"auto\" src=\"http://pbs.twimg.com/media/CHIGI-DW4AANQwu.jpg\"><\/p>",
                "tweetText": "White hair http://t.co/77q89RfxhS",
                "numOfRetweets": 162239,
                "numOfFavorites": 242932
            }
        }
    }
};

    console.log(peopleJSON);
    createTable(peopleJSON);

    $('.linkOne').on('click', function(data) {
        console.log("link: ");
        console.log(data);
        $(this).siblings('.imgOne').slideToggle('fast');
        $(this).siblings('.imgTwo').hide();
    });

    $('.linkTwo').on('click', function() {
        $(this).siblings('.imgTwo').slideToggle('fast');
        $(this).siblings('.imgOne').hide();
    });

    $('.tweetCard').on('click', function(event) {
        console.log("\n\ntweetCard: " + event);
        console.log((event.toElement.className));
        console.log((event.toElement.className).indexOf('imgLink'));    //Detecting if click in tweetCard was on the imgLink class


        var clickedClassName = event.toElement.className;
        if (clickedClassName.indexOf('imgLink') < 0 ) {
            //click happened in tweetCard but not on image links
            console.log('click happened in tweetCard but not on image links');
        } else {
            //click happened in tweetCard and on image links
            console.log('click happened in tweetCard and on image links');
        }
    });

    $('.userCard').on('click', function(event) {
        console.log('click on userCard');
        var block = $(this);
        $('.userCard').each(function(index, el) {
            $(this).css('box-shadow', 'none');
        });
        block.css('box-shadow', '0px 0px 5px #66CCFF');
    });

    $('.tweetCard').on('click', function(event) {
        console.log('click on tweetCard');
        var block = $(this);
        $('.tweetCard').each(function(index, el) {
            $(this).css('box-shadow', 'none');
        });
        block.css('box-shadow', '0px 0px 5px #66CCFF');
    });

});
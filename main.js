/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {
    /**
     * Function generates a table containing Twitter Users and their randomized tweets.
     * Function also appends this table to the <body> on the front-end
     * @param  {[JSON]} tableContentJSON: JSON object containing the userInfo and tweetInfo (correct and incorrect)
     */
    function createTable(tableContentJSON, correctIncorrect, appendTo) {
        html = '<table class="table" style="display: none;">\n';
        html = html + '    <thead>\n';
        html = html + '        <tr>\n';
        html = html + '            <th>\n' + 'User' + '</th>\n';
        html = html + '            <th>\n' + 'Tweet' + '</th>\n';
        html = html + '        </tr>\n';
        html = html + '    </thead>\n';

        html = html + '    <tbody>\n';
        $.each(tableContentJSON[correctIncorrect], function(key, element) {
            html = html + '        <tr>\n';
            html = html + '            <td>\n';
            html = html + '                <div class="userCard">\n';
            html = html + '                    <div class="userImg">\n';
            html = html + '                        <a href="https://twitter.com/' + element['userInfo']['handle'].substring(1) + '" target="_blank"><img src="' + element['userInfo']['profilePicURL'] + '"></a>\n';
            html = html + '                    </div>\n';

            html = html + '                    <div class="userInfo">\n';
            html = html + '                        <div class="userName">' + element['userInfo']['name'] + '</div>\n';
            html = html + '                        <div class="userHandle">' + element['userInfo']['handle'] + '</div>\n';
            html = html + '                    </div>\n';

            html = html + '                    <a class="followButton" href="' + element['userInfo']['followURL'] + '" target="_blank">\n';
            html = html + '                        <span class="fa fa-twitter"></span>\n';
            html = html + '                        <p class="text">Follow</p>\n';
            html = html + '                    </a>\n';
            html = html + '                </div>\n';
            html = html + '            </td>\n';

            html = html + '            <td>\n';
            html = html + '                <div class="tweetCard">\n';
            html = html +                       element['tweetInfo']['tweetHTML'];
            html = html + '                </div>\n';
            html = html + '            </td>\n';
            html = html + '        </tr>\n';
        });

        html = html + '    </tbody>\n';
        html = html + '</table>\n';

        $(appendTo).append(html);
    }

    var peopleJSON =
{
    "correct":
    {
        "kelly_clarkson":{
            "userInfo":{
                "name":"Kelly Clarkson",
                "handle":"@kelly_clarkson",
                "profilePicURL":"http://pbs.twimg.com/profile_images/565273523564736512/Bhh8z_cE.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@kelly_clarkson"
            },
            "tweetInfo":{
                "tweetID":585131724025294800,
                "tweetDate":"Mon Apr 06 17:27:28 +0000 2015",
                "tweetHTML":"<p>Mom-\"Boyz II Men r black?\"\nMe/Sister-\"R u serious?\" Mom-\"Yes\"\nMe/Sister-(laugh hysterically)\nMom-\"Wait, I was thinking of NKOTB\"<a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/SoDifferent?src=hash\">#SoDifferent</a></p>",
                "tweetText":"Mom-\"Boyz II Men r black?\"\nMe/Sister-\"R u serious?\" Mom-\"Yes\"\nMe/Sister-(laugh hysterically)\nMom-\"Wait, I was thinking of NKOTB\"#SoDifferent",
                "numOfRetweets":326,
                "numOfFavorites":1346
            }
        },

        "ricky_martin":{
            "userInfo":{
                "name":"Ricky Martin",
                "handle":"@ricky_martin",
                "profilePicURL":"http://pbs.twimg.com/profile_images/588872134241427457/OUVHF8MR.jpg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@ricky_martin"
            },
            "tweetInfo":{
                "tweetID":583693341096808400,
                "tweetDate":"Thu Apr 02 18:11:51 +0000 2015",
                "tweetHTML":"<p>Mi album \"A Quien Quiera Escuchar\" está dedicado a todos los <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/sexysouls?src=hash\">#sexysouls</a> que me inspiran a <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/VivirLaVidaBold?src=hash\">#VivirLaVidaBold</a> <div class=\"imgLink linkOne\">http://t.co/CASVsoCXoG</div><img class=\"tweetImg imgOne\" width=\"450px\" style=\"display: none;\" height=\"auto\" src=\"http://pbs.twimg.com/media/CBmyADJW4AAnbeP.png\"></p>",
                "tweetText":"Mi album \"A Quien Quiera Escuchar\" está dedicado a todos los #sexysouls que me inspiran a #VivirLaVidaBold http://t.co/CASVsoCXoG",
                "numOfRetweets":203,
                "numOfFavorites":416
            }
        },

        "NiallOfficial":{
            "userInfo":{
                "name":"Niall Horan",
                "handle":"@NiallOfficial",
                "profilePicURL":"http://pbs.twimg.com/profile_images/552488743555567619/AhR_vBw9.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@NiallOfficial"
            },
            "tweetInfo":{
                "tweetID":608331138420080600,
                "tweetDate":"Tue Jun 09 17:53:40 +0000 2015",
                "tweetHTML":"<p>I'm at work sadly , so won't be able t watch it, surely Japan and germany will be there or there abouts  <a class=\"webLink\" target=\"_blank\" href=\"https://twitter.com/fifawwc/status/608323259998838786\">https://t.co/cUOIohVl1I</a></p>",
                "tweetText":"I'm at work sadly , so won't be able t watch it, surely Japan and germany will be there or there abouts  https://t.co/cUOIohVl1I",
                "numOfRetweets":73299,
                "numOfFavorites":117881
            }
        },

        "ericstonestreet":{
            "userInfo":{
                "name":"Eric Stonestreet",
                "handle":"@ericstonestreet",
                "profilePicURL":"http://pbs.twimg.com/profile_images/378800000626926058/aa196b61745a1bd09d5e27c394f608fb.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@ericstonestreet"
            },
            "tweetInfo":{
                "tweetID":588746452735631400,
                "tweetDate":"Thu Apr 16 16:51:07 +0000 2015",
                "tweetHTML":"<p>RT <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/JoeManganiello\">@JoeManganiello</a>: Tonight! See <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/ericstonestreet\">@ericstonestreet</a> as Charlie Donovan and Eddie Harris in the LIVE read of <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/LACMA\">@LACMA</a>'s <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/MajorLeague?src=hash\">#MajorLeague</a> @filmindepe…</p>",
                "tweetText":"RT @JoeManganiello: Tonight! See @ericstonestreet as Charlie Donovan and Eddie Harris in the LIVE read of @LACMA's #MajorLeague @filmindepe…",
                "numOfRetweets":41,
                "numOfFavorites":0
            }
        },

        "SrBachchan":{
            "userInfo":{
                "name":"Amitabh Bachchan",
                "handle":"@SrBachchan",
                "profilePicURL":"http://pbs.twimg.com/profile_images/622497417863131136/o95FrYtE.jpg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@SrBachchan"
            },
            "tweetInfo":{
                "tweetID":622324101227515900,
                "tweetDate":"Sat Jul 18 08:36:42 +0000 2015",
                "tweetHTML":"<p>T 1934 - A moment of greatest pride and honour for me !! Singing the National Anthem LIVE at 7:50 pm Star Sorts, ProKabaddi inaugural !!</p>",
                "tweetText":"T 1934 - A moment of greatest pride and honour for me !! Singing the National Anthem LIVE at 7:50 pm Star Sorts, ProKabaddi inaugural !!",
                "numOfRetweets":242,
                "numOfFavorites":686
            }
        },

        "tyrabanks":{
            "userInfo":{
                "name":"Tyra Banks",
                "handle":"@tyrabanks",
                "profilePicURL":"http://pbs.twimg.com/profile_images/607921435110088704/ShktIWxi.jpg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@tyrabanks"
            },
            "tweetInfo":{
                "tweetID":592361757856763900,
                "tweetDate":"Sun Apr 26 16:17:03 +0000 2015",
                "tweetHTML":"<p>Damn, this thing I'm hosting is live today. \n\nIf I mess up, there ain't no re-do's!!!\n\n😁😁😁\n\n<a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/DaytimeEmmys?src=hash\">#DaytimeEmmys</a></p>",
                "tweetText":"Damn, this thing I'm hosting is live today. \n\nIf I mess up, there ain't no re-do's!!!\n\n😁😁😁\n\n#DaytimeEmmys",
                "numOfRetweets":143,
                "numOfFavorites":741
            }
        },

        "edsheeran":{
            "userInfo":{
                "name":"Ed Sheeran",
                "handle":"@edsheeran",
                "profilePicURL":"http://pbs.twimg.com/profile_images/454206880676851712/jVypIZpS.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@edsheeran"
            },
            "tweetInfo":{
                "tweetID":622146080034168800,
                "tweetDate":"Fri Jul 17 20:49:19 +0000 2015",
                "tweetHTML":"<p>iArena, 11pm - latitude</p>",
                "tweetText":"iArena, 11pm - latitude",
                "numOfRetweets":4718,
                "numOfFavorites":12082
            }
        },

        "SnoopDogg":{
            "userInfo":{
                "name":"Snoop Dogg",
                "handle":"@SnoopDogg",
                "profilePicURL":"http://pbs.twimg.com/profile_images/595448225982623744/lT2g5UVA.jpg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@SnoopDogg"
            },
            "tweetInfo":{
                "tweetID":621749717094019100,
                "tweetDate":"Thu Jul 16 18:34:18 +0000 2015",
                "tweetHTML":"<p>Just posted a photo <a class=\"webLink\" target=\"_blank\" href=\"https://instagram.com/p/5NQ5ooP9AX/\">https://t.co/e79Pz6ULis</a></p>",
                "tweetText":"Just posted a photo https://t.co/e79Pz6ULis",
                "numOfRetweets":21,
                "numOfFavorites":57
            }
        },

        "taylorswift13":{
            "userInfo":{
                "name":"Taylor Swift",
                "handle":"@taylorswift13",
                "profilePicURL":"http://pbs.twimg.com/profile_images/505200807503867904/osJXmYRl.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@taylorswift13"
            },
            "tweetInfo":{
                "tweetID":605841586841206800,
                "tweetDate":"Tue Jun 02 21:01:04 +0000 2015",
                "tweetHTML":"<p>So excited for <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/1989TourLouisville?src=hash\">#1989TourLouisville</a> tonight!!!!!</p>",
                "tweetText":"So excited for #1989TourLouisville tonight!!!!!",
                "numOfRetweets":12249,
                "numOfFavorites":31080
            }
        },

        "DalaiLama":{
            "userInfo":{
                "name":"Dalai Lama",
                "handle":"@DalaiLama",
                "profilePicURL":"http://pbs.twimg.com/profile_images/529214699041067008/fqPBAr5s.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@DalaiLama"
            },
            "tweetInfo":{
                "tweetID":375913853541830660,
                "tweetDate":"Fri Sep 06 09:30:21 +0000 2013",
                "tweetHTML":"<p>If we have peace of mind, we’ll always feel happy. Deceiving ourselves that money is the source of happiness, we won’t.</p>",
                "tweetText":"If we have peace of mind, we’ll always feel happy. Deceiving ourselves that money is the source of happiness, we won’t.",
                "numOfRetweets":11395,
                "numOfFavorites":4826
            }
        }
    },

    "incorrect":
    {
        "kelly_clarkson":{
            "userInfo":{
                "name":"Kelly Clarkson",
                "handle":"@kelly_clarkson",
                "profilePicURL":"http://pbs.twimg.com/profile_images/565273523564736512/Bhh8z_cE.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@kelly_clarkson"
            },
            "tweetInfo":{
                "tweetID":588746452735631400,
                "tweetDate":"Thu Apr 16 16:51:07 +0000 2015",
                "tweetHTML":"<p>RT <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/JoeManganiello\">@JoeManganiello</a>: Tonight! See <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/ericstonestreet\">@ericstonestreet</a> as Charlie Donovan and Eddie Harris in the LIVE read of <a class=\"userMentionLink\" target=\"_blank\" href=\"https://twitter.com/LACMA\">@LACMA</a>'s <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/MajorLeague?src=hash\">#MajorLeague</a> @filmindepe…</p>",
                "tweetText":"RT @JoeManganiello: Tonight! See @ericstonestreet as Charlie Donovan and Eddie Harris in the LIVE read of @LACMA's #MajorLeague @filmindepe…",
                "numOfRetweets":41,
                "numOfFavorites":0
            }
        },

        "ricky_martin":{
            "userInfo":{
                "name":"Ricky Martin",
                "handle":"@ricky_martin",
                "profilePicURL":"http://pbs.twimg.com/profile_images/588872134241427457/OUVHF8MR.jpg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@ricky_martin"
            },
            "tweetInfo":{
                "tweetID":583693341096808400,
                "tweetDate":"Thu Apr 02 18:11:51 +0000 2015",
                "tweetHTML":"<p>Mi album \"A Quien Quiera Escuchar\" está dedicado a todos los <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/sexysouls?src=hash\">#sexysouls</a> que me inspiran a <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/VivirLaVidaBold?src=hash\">#VivirLaVidaBold</a> <div class=\"imgLink linkOne\">http://t.co/CASVsoCXoG</div><img class=\"tweetImg imgOne\" width=\"450px\" style=\"display: none;\" height=\"auto\" src=\"http://pbs.twimg.com/media/CBmyADJW4AAnbeP.png\"></p>",
                "tweetText":"Mi album \"A Quien Quiera Escuchar\" está dedicado a todos los #sexysouls que me inspiran a #VivirLaVidaBold http://t.co/CASVsoCXoG",
                "numOfRetweets":203,
                "numOfFavorites":416
            }
        },

        "NiallOfficial":{
            "userInfo":{
                "name":"Niall Horan",
                "handle":"@NiallOfficial",
                "profilePicURL":"http://pbs.twimg.com/profile_images/552488743555567619/AhR_vBw9.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@NiallOfficial"
            },
            "tweetInfo":{
                "tweetID":621749717094019100,
                "tweetDate":"Thu Jul 16 18:34:18 +0000 2015",
                "tweetHTML":"<p>Just posted a photo <a class=\"webLink\" target=\"_blank\" href=\"https://instagram.com/p/5NQ5ooP9AX/\">https://t.co/e79Pz6ULis</a></p>",
                "tweetText":"Just posted a photo https://t.co/e79Pz6ULis",
                "numOfRetweets":21,
                "numOfFavorites":57
            }
        },

        "ericstonestreet":{
            "userInfo":{
                "name":"Eric Stonestreet",
                "handle":"@ericstonestreet",
                "profilePicURL":"http://pbs.twimg.com/profile_images/378800000626926058/aa196b61745a1bd09d5e27c394f608fb.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@ericstonestreet"
            },
            "tweetInfo":{
                "tweetID":375913853541830660,
                "tweetDate":"Fri Sep 06 09:30:21 +0000 2013",
                "tweetHTML":"<p>If we have peace of mind, we’ll always feel happy. Deceiving ourselves that money is the source of happiness, we won’t.</p>",
                "tweetText":"If we have peace of mind, we’ll always feel happy. Deceiving ourselves that money is the source of happiness, we won’t.",
                "numOfRetweets":11395,
                "numOfFavorites":4826
            }
        },

        "SrBachchan":{
            "userInfo":{
                "name":"Amitabh Bachchan",
                "handle":"@SrBachchan",
                "profilePicURL":"http://pbs.twimg.com/profile_images/622497417863131136/o95FrYtE.jpg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@SrBachchan"
            },
            "tweetInfo":{
                "tweetID":585131724025294800,
                "tweetDate":"Mon Apr 06 17:27:28 +0000 2015",
                "tweetHTML":"<p>Mom-\"Boyz II Men r black?\"\nMe/Sister-\"R u serious?\" Mom-\"Yes\"\nMe/Sister-(laugh hysterically)\nMom-\"Wait, I was thinking of NKOTB\"<a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/SoDifferent?src=hash\">#SoDifferent</a></p>",
                "tweetText":"Mom-\"Boyz II Men r black?\"\nMe/Sister-\"R u serious?\" Mom-\"Yes\"\nMe/Sister-(laugh hysterically)\nMom-\"Wait, I was thinking of NKOTB\"#SoDifferent",
                "numOfRetweets":326,
                "numOfFavorites":1346
            }
        },

        "tyrabanks":{
            "userInfo":{
                "name":"Tyra Banks",
                "handle":"@tyrabanks",
                "profilePicURL":"http://pbs.twimg.com/profile_images/607921435110088704/ShktIWxi.jpg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@tyrabanks"
            },
            "tweetInfo":{
                "tweetID":592361757856763900,
                "tweetDate":"Sun Apr 26 16:17:03 +0000 2015",
                "tweetHTML":"<p>Damn, this thing I'm hosting is live today. \n\nIf I mess up, there ain't no re-do's!!!\n\n😁😁😁\n\n<a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/DaytimeEmmys?src=hash\">#DaytimeEmmys</a></p>",
                "tweetText":"Damn, this thing I'm hosting is live today. \n\nIf I mess up, there ain't no re-do's!!!\n\n😁😁😁\n\n#DaytimeEmmys",
                "numOfRetweets":143,
                "numOfFavorites":741
            }
        },

        "edsheeran":{
            "userInfo":{
                "name":"Ed Sheeran",
                "handle":"@edsheeran",
                "profilePicURL":"http://pbs.twimg.com/profile_images/454206880676851712/jVypIZpS.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@edsheeran"
            },
            "tweetInfo":{
                "tweetID":605841586841206800,
                "tweetDate":"Tue Jun 02 21:01:04 +0000 2015",
                "tweetHTML":"<p>So excited for <a class=\"hashtagLink\" target=\"_blank\" href=\"https://twitter.com/hashtag/1989TourLouisville?src=hash\">#1989TourLouisville</a> tonight!!!!!</p>",
                "tweetText":"So excited for #1989TourLouisville tonight!!!!!",
                "numOfRetweets":12249,
                "numOfFavorites":31080
            }
        },

        "SnoopDogg":{
            "userInfo":{
                "name":"Snoop Dogg",
                "handle":"@SnoopDogg",
                "profilePicURL":"http://pbs.twimg.com/profile_images/595448225982623744/lT2g5UVA.jpg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@SnoopDogg"
            },
            "tweetInfo":{
                "tweetID":622146080034168800,
                "tweetDate":"Fri Jul 17 20:49:19 +0000 2015",
                "tweetHTML":"<p>iArena, 11pm - latitude</p>",
                "tweetText":"iArena, 11pm - latitude",
                "numOfRetweets":4718,
                "numOfFavorites":12082
            }
        },

        "taylorswift13":{
            "userInfo":{
                "name":"Taylor Swift",
                "handle":"@taylorswift13",
                "profilePicURL":"http://pbs.twimg.com/profile_images/505200807503867904/osJXmYRl.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@taylorswift13"
            },
            "tweetInfo":{
                "tweetID":608331138420080600,
                "tweetDate":"Tue Jun 09 17:53:40 +0000 2015",
                "tweetHTML":"<p>I'm at work sadly , so won't be able t watch it, surely Japan and germany will be there or there abouts  <a class=\"webLink\" target=\"_blank\" href=\"https://twitter.com/fifawwc/status/608323259998838786\">https://t.co/cUOIohVl1I</a></p>",
                "tweetText":"I'm at work sadly , so won't be able t watch it, surely Japan and germany will be there or there abouts  https://t.co/cUOIohVl1I",
                "numOfRetweets":73299,
                "numOfFavorites":117881
            }
        },

        "DalaiLama":{
            "userInfo":{
                "name":"Dalai Lama",
                "handle":"@DalaiLama",
                "profilePicURL":"http://pbs.twimg.com/profile_images/529214699041067008/fqPBAr5s.jpeg",
                "followURL":"https://twitter.com/intent/follow?screen_name=@DalaiLama"
            },
            "tweetInfo":{
                "tweetID":622324101227515900,
                "tweetDate":"Sat Jul 18 08:36:42 +0000 2015",
                "tweetHTML":"<p>T 1934 - A moment of greatest pride and honour for me !! Singing the National Anthem LIVE at 7:50 pm Star Sorts, ProKabaddi inaugural !!</p>",
                "tweetText":"T 1934 - A moment of greatest pride and honour for me !! Singing the National Anthem LIVE at 7:50 pm Star Sorts, ProKabaddi inaugural !!",
                "numOfRetweets":242,
                "numOfFavorites":686
            }
        }
    }
};
    // $.ajax({
    //     url: "php/gameObject.php",
    //     type: "GET",
    //     async: false,
    //     success: function (response) {
    //         peopleJSON = JSON.parse(response);
    //     }
    // });


    /* Creating table */
    createTable(peopleJSON, 'incorrect', 'body');

    $('.startButton').on('click', function(event) {
        $(document).trigger('startGame');
    });

    $(document).on('startGame', function(event) {
        $('.startButton').remove();
        $('.guide').remove();
        $('table').fadeIn('slow');
        initializeTimer(121);       //Initializing timer when <table> is created
    });



    var correctOrder = peopleJSON['correct'];       /** @type {Object} [Holds correct JSON from complete gameObject] */
    var incorrectOrder = peopleJSON['incorrect'];   /** @type {Object} [Holds incorrect JSON from complete gameObject] */
    var hasSelectedUser = false;                    /** @type {Boolean} [True if player has selected a user] */
    var hasSelectedTweet = false;                   /** @type {Boolean} [True if player has selected a tweet] */

    var selectedUser;                       /** @type {Object} [Currently selected User] */
    var selectedTweet;                      /** @type {Object} [Currently selected user corresponding the Tweet block] */
    var selectedUserCard;                   /** @type {Object} [Currently selected User block] */
    var selectedTweetCard;                  /** @type {Object} [Currently selected Tweet block] */

    var selectedCorrectUser = '';           /** @type {String} [Set of correctly selected users] */
    var selectedCorrectTweet = '';          /** @type {String} [Set of users corresponding correctly selected tweets] */

    var correctMatches = 0;
    var score = 0;

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

    /*
        Checking if clicking outside cards to deselect them
     */
    $('body').on('click', function(event) {
        var clickedTagLocalName = event.target.localName;
        //console.log(event);

        if(clickedTagLocalName == 'body' || clickedTagLocalName == 'td') {
            if(selectedUserCard != undefined) {
                selectedUserCard.removeClass('selectedCard incorrectSelection');
                selectedUserCard = undefined;
                hasSelectedUser = false;
            }

            if(selectedTweetCard != undefined) {
                selectedTweetCard.removeClass('selectedCard incorrectSelection');
                selectedTweetCard = undefined;
                hasSelectedTweet = false;
            }
        }
    });

    //Highlighting the selected card (userCard)
    $('.userCard').on('click', function(event) {
        console.log('\n\nclick on userCard');
        var clickedClassName = event.target.className;
        var clickedTagLocalName = event.target.localName;

        var block = $(this);
        console.log(block);
        var localSelectedUser = block.find('.userInfo').find('.userHandle')['0']['innerHTML'].replace('@', '');

        if(!(selectedCorrectUser.indexOf(localSelectedUser) >= 0)) {
            if(!((clickedTagLocalName.indexOf('img') >= 0) || (clickedClassName.indexOf('followButton') >= 0))) {
                if(selectedUserCard == undefined) {                 // If no user was selected before, i.e., this is the first selection
                    selectedUserCard = $(this);                     // This is now the selectedUserCard
                    selectedUserCard.toggleClass('selectedCard');   // because this was selected, highlight it
                } else {                                            // If something was selected, before this
                    selectedUserCard.toggleClass('selectedCard');   // First remove highlight from previous block
                    selectedUserCard = $(this);                     // Change selection to block that was clicked right now
                    selectedUserCard.toggleClass('selectedCard');   // Highlight this new block
                }

                hasSelectedUser = true;

                if(hasSelectedTweet) {
                    parseSelectedPair(selectedUserCard, selectedTweetCard);
                }
            }
        }
    });

    //Highlighting the selected card (tweetCard)
    $('.tweetCard').on('click', function(event) {
        console.log('click on tweetCard');
        var clickedClassName = event.target.className;

        var block = $(this);
        var localSelectedTweet = block.parent('td').siblings('td').find('.userCard').find('.userInfo').find('.userHandle')['0']['innerHTML'].replace('@', '');

        if(!(selectedCorrectTweet.indexOf(localSelectedTweet) >= 0)) { // If trying to select a tweet that was already matched as a correct pair.
            if (clickedClassName.indexOf('imgLink') < 0 ) {
                //click happened in tweetCard but not on image links
                console.log('click happened in tweetCard but not on image links');

                if(selectedTweetCard == undefined) {                 // If no user was selected before, i.e., this is the first selection
                    selectedTweetCard = $(this);                     // This is now the selectedTweetCard
                    selectedTweetCard.toggleClass('selectedCard');   // because this was selected, highlight it
                } else {                                             // If something was selected, before this
                    console.log('entered IF');
                    selectedTweetCard.toggleClass('selectedCard');   // First remove highlight from previous block
                    selectedTweetCard = $(this);                     // Change selection to block that was clicked right now
                    selectedTweetCard.toggleClass('selectedCard');   // Highlight this new block
                }

                hasSelectedTweet = true;

                if(hasSelectedUser) {
                    parseSelectedPair(selectedUserCard, selectedTweetCard);
                }
            }
        }
    });

    /**
     * [If click happens on any link in a card, stops traversing up the DOM tree and doesn't select the card]
     */
    $('td a').on('click', function(event) {
        event.stopPropagation();
    });


    /**
     * Compares a users selection to identify whether their selection was correct or not.
     * Based on the result of this comparison, takes certian steps:
     *     - Applies appropriate classes such as 'correctSelection' and 'incorrectSelection'
     *     - If correct, adds the Celeb and Tweet to a global list for future reference
     *     - De-references all selections towards the end
     *
     * @param  {[Object]} userBlock [User block that was selected]
     * @param  {[Object]} tweetBlock [Tweet block that was selected]
     */
    function parseSelectedPair(userBlock, tweetBlock) {
        selectedUser = userBlock.find('.userInfo').find('.userHandle')['0']['innerHTML'].replace('@', '');
        selectedTweet = tweetBlock.parent('td').siblings('td').find('.userCard').find('.userInfo').find('.userHandle')['0']['innerHTML'].replace('@', '');

        //Selected Correct
        if(correctOrder[selectedUser]['tweetInfo']['tweetID'] == incorrectOrder[selectedTweet]['tweetInfo']['tweetID']) {
            console.log('selected correct');
            $('table').trigger('correct-selection');        //Triggering correct selection event

            selectedUserCard.toggleClass('correctSelection');
            selectedTweetCard.toggleClass('correctSelection');

            selectedCorrectUser = selectedCorrectUser + selectedUser;       //Adding user to list of correctly selected users
            selectedCorrectTweet = selectedCorrectTweet + selectedTweet;    //Adding tweet to list of correctly selected tweets
        } else {    //Selected Incorrect
            console.log('selected incorrect');
            $('table').trigger('incorrect-selection');      //Triggering incorrect selection event

            selectedUserCard.toggleClass('incorrectSelection');
            selectedTweetCard.toggleClass('incorrectSelection');

            selectedUserCard.toggleClass('shake shake-horzontal');
            selectedTweetCard.toggleClass('shake shake-horzontal');

        }

        selectedUserCard.toggleClass('selectedCard');
        selectedTweetCard.toggleClass('selectedCard');
        selectedUserCard = undefined;
        selectedTweetCard = undefined;
        hasSelectedUser = false;
        hasSelectedTweet = false;
    }

    /**
     * This function is listening for an event which is fired when an INCORRECT selection is made in the table
     */
    $('table').on('incorrect-selection', function(event) {
        deductTime(10);     //Deducting 10 seconds for incorrect selection
        $('.incorrectSound').trigger('play');
        removeIncorrectSelectionProperties(500, selectedUserCard, selectedTweetCard);
    });

    /**
     * This function is listening for an event which is fired when a CORRECT selection is made in the table
     */
    $('table').on('correct-selection', function(event) {
        correctMatches = correctMatches + 1;
        if (correctMatches === 10) {
            var endEvent = $.Event('endGame');
            endEvent._all = true;
            $('body').trigger(endEvent);
        }
        $('.correctSound').trigger('play');
        addCorrectSelectionProperties(0, selectedUserCard, selectedTweetCard);

        var remainingTime = $('.timer').TimeCircles().getTime();
        console.log('Got time: ' + remainingTime);

        $('.score').text(calculateScore(remainingTime));
    });

    function addCorrectSelectionProperties(time, userCardSelected, tweetCardSelected) {
        var localUserCardSelected = $.extend(true, {}, userCardSelected);
        var localTweetCardSelected = $.extend(true, {}, tweetCardSelected);

        setTimeout(function() {
            localUserCardSelected.toggleClass('correctSelectionAnimation');
            localTweetCardSelected.toggleClass('correctSelectionAnimation');
        }, time);
    }

    /**
     * Removes red shadow from an incorrectly selected pair after time 'time'
     * NOTE: Tried doing this inside parseSelectedPair(userBlock, tweetBlock) but timeout needed to be defined
     *       with new object.
     * @param  {[int]} time              [Delay in milliseconds after which the shadow should be removed]
     * @param  {[Object]} userCardSelected  [User card that was selected]
     * @param  {[Object]} tweetCardSelected [Tweet Card that was selected]
     */
    function removeIncorrectSelectionProperties(time, userCardSelected, tweetCardSelected) {
        var localUserCardSelected = $.extend(true, {}, userCardSelected);
        var localTweetCardSelected = $.extend(true, {}, tweetCardSelected);

        setTimeout(function() {
            localUserCardSelected.toggleClass('incorrectSelection');
            localTweetCardSelected.toggleClass('incorrectSelection');

            localUserCardSelected.toggleClass('shake shake-horzontal');
            localTweetCardSelected.toggleClass('shake shake-horzontal');
        }, time);
    }

    function calculateScore(time) {
        var tempScore = Math.floor((Math.pow(1.05, time) * (correctMatches/2)));
        var temp = score;
        score = score + tempScore;
        temp = score - temp;
        console.log('***************Step for ' + correctMatches + ' : ' + temp + '   **************');
        return score;
    }

    /**
     * This function is listening for an event which is fired when the time has run out which implies that the game has ended
     */
    $('body').on('endGame', function(event) {
        console.log(event);
        $('table').remove();
        $('.timer').TimeCircles().destroy();
        $('.timer').remove();
        $('.score').remove();
        addEndInformation();

    });

    function addEndInformation () {
        var tempHTML = '';
        tempHTML = tempHTML + '<div class="endInfo">';
        tempHTML = tempHTML + '    <div class="finalScore">';
        tempHTML = tempHTML + '        <p>Your Score:<span>' + score + '</span></p></div>';
        tempHTML = tempHTML + '    <div class="survey">';
        tempHTML = tempHTML + '        <p>Please take our survey to make this game better: <span></span></p>';
        tempHTML = tempHTML + '    </div>';
        tempHTML = tempHTML + '    <div>';
        tempHTML = tempHTML + '        <button class="answers">Answers</button>';
        tempHTML = tempHTML + '    </div>';
        tempHTML = tempHTML + '    <div class="correct">';
        tempHTML = tempHTML + '    </div>';
        tempHTML = tempHTML + '</div>';
        $('body').append(tempHTML);
    }

    $('body').on('click', '.answers', function(event) {
        createTable(peopleJSON, 'correct', 'body');
        $('.answers').remove();
        $('table').css('box-shadow', '0 0 30px -5px rgba(0,0,0,0.4)');
        $('table').fadeIn('slow');
        $('table thead th').empty();


    });

    /**
     * Function is called when time needs to be duducted from the running timer.
     * @param  {[Integer]} deduction [Amout of time in SECONDS to be deducted]
     */
    function deductTime(deduction) {
        var tmp = $('.timer').TimeCircles().getTime();
        console.log(tmp);
        tmp = Math.floor((tmp-deduction));

        /**
         * At this point tmp hold the new time after deduction.
         * eg: Incorrect selection occured at 115s
         *     tmp now holds 105
         */
        $(".timer").data('timer', tmp).TimeCircles().restart();
    }

    /**
     * Initializes the countdown clock
     * @param  {[Integer]} newTime [Time in SECONDS which the countdown needs to be set to]
     */
    function initializeTimer(newTime) {
        $('.timer').data('timer', newTime).TimeCircles({
            "total_duration": newTime,
            "count_past_zero": false,
            "use_background": false,
            "animation": "ticks",
            "time": {
                "Days": {
                    "show": false
                },
                "Hours": {
                    "show": false
                },
                "Minutes": {
                    "show": false
                },
                "Seconds": {
                    "text": "Seconds",
                    "color": "#00B200",
                    "show": true
                }
            }
        }).start().addListener(function(unit, amount, total) {
            // console.log('\n\n');
            // console.log('unit: ' + unit);
            // console.log('amount: ' + amount);
            // console.log('total: ' + total);
            var newColor;

            if(total == 0) {
                var endEvent = $.Event('endGame');
                endEvent._all = false;
                $('body').trigger(endEvent);
            } else if(total <= 30) {
                newColor = "#E60000";
            } else if(total <= 75) {
                newColor = "#FFFF5C";
            }

            $('.timer').TimeCircles({
                "time": {
                    "Seconds": {
                    "color": newColor
                    }
                }
            });
        });
    }
});
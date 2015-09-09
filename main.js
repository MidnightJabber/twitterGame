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
        html = '<table class="table">\n';
        html = html + '    <thead>\n';
        html = html + '        <tr>\n';
        html = html + '            <th>\n' + 'User' + '</th>\n';
        html = html + '            <th>\n' + 'Tweet' + '</th>\n';
        html = html + '        </tr>\n';
        html = html + '    </thead>\n';

        html = html + '    <tbody>\n';
        $.each(tableContentJSON[correctIncorrect], function(key, element) {

            tweetHTML = twemoji.parse(element['tweetInfo']['tweetHTML']);


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
            html = html +                      tweetHTML;
            html = html + '                </div>\n';
            html = html + '            </td>\n';
            html = html + '        </tr>\n';
        });

        html = html + '    </tbody>\n';
        html = html + '</table>\n';

        $(appendTo).append(html);
    }

    var peopleJSON;
    $.ajax({
        url: "php/gameObject.php",
        type: "GET",
        async: false,
        success: function (response) {
            peopleJSON = JSON.parse(response);
        }
    });



    $('.startButton').on('click', function(event) {
        $(document).trigger('startGame');
        /* Creating table */
        createTable(peopleJSON, 'incorrect', 'body');
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
    var incorrectMatches = 0;
    var score = 0;
    var finalTimeLeft = 0;

    $('.linkOne').on('click', function(data) {
        // console.log("link: ");
        // console.log(data);
        $(this).siblings('.imgOne').slideToggle('fast');
        $(this).siblings('.imgTwo').hide();
    });

    $('.linkTwo').on('click', function() {
        $(this).siblings('.imgTwo').slideToggle('fast');
        $(this).siblings('.imgOne').hide();
    });

    $('body').on('click', '.linkOne', function(data) {
        // console.log("link: ");
        // console.log(data);
        $(this).siblings('.imgOne').slideToggle('fast');
        $(this).siblings('.imgTwo').hide();
    });

    $('body').on('click', '.linkTwo', function() {
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
    $('body').on('click', '.userCard', function(event) {
        // console.log('\n\nclick on userCard');
        var clickedClassName = event.target.className;
        var clickedTagLocalName = event.target.localName;

        var block = $(this);
        var localSelectedUser = block.find('.userInfo').find('.userHandle')['0']['innerHTML'].replace('@', '');

        if(!(selectedCorrectUser.indexOf(localSelectedUser) >= 0)) {
            if(!((clickedTagLocalName.indexOf('img') >= 0) || (clickedClassName.indexOf('followButton') >= 0))) {
                if(selectedUserCard == undefined) {                 // If no user was selected before, i.e., this is the first selection
                    selectedUserCard = $(this);                     // This is now the selectedUserCard
                    selectedUserCard.toggleClass('selectedCard');   // because this was selected, highlight it
                    hasSelectedUser = true;
                } else {
                    if (block[0] === selectedUserCard[0]) {
                        selectedUserCard.toggleClass('selectedCard');   // First remove highlight from previous block
                        selectedUserCard = undefined;
                        hasSelectedUser = false;
                    } else {
                        selectedUserCard.toggleClass('selectedCard');   // First remove highlight from previous block
                        selectedUserCard = $(this);                     // Change selection to block that was clicked right now
                        selectedUserCard.toggleClass('selectedCard');   // Highlight this new block
                        hasSelectedUser = true;
                    }                                           // If something was selected, before this
                }

                if(hasSelectedTweet) {
                    parseSelectedPair(selectedUserCard, selectedTweetCard);
                }
            }
        }
    });

    //Highlighting the selected card (tweetCard)
    $('body').on('click', '.tweetCard', function(event) {
        // console.log('click on tweetCard');
        var clickedClassName = event.target.className;

        var block = $(this);
        var localSelectedTweet = block.parent('td').siblings('td').find('.userCard').find('.userInfo').find('.userHandle')['0']['innerHTML'].replace('@', '');

        if(!(selectedCorrectTweet.indexOf(localSelectedTweet) >= 0)) { // If trying to select a tweet that was already matched as a correct pair.
            if(selectedTweetCard == undefined) {                 // If no user was selected before, i.e., this is the first selection
                selectedTweetCard = $(this);                     // This is now the selectedTweetCard
                selectedTweetCard.toggleClass('selectedCard');   // because this was selected, highlight it
                hasSelectedTweet = true;
            } else {
                if (block[0] === selectedTweetCard[0]) {
                    selectedTweetCard.toggleClass('selectedCard');   // First remove highlight from previous block
                    selectedTweetCard = undefined;
                    hasSelectedTweet = false;
                } else {
                    selectedTweetCard.toggleClass('selectedCard');   // First remove highlight from previous block
                    selectedTweetCard = $(this);                     // Change selection to block that was clicked right now
                    selectedTweetCard.toggleClass('selectedCard');   // Highlight this new block
                    hasSelectedTweet = true;
                }                                           // If something was selected, before this
            }

            if(hasSelectedUser) {
                parseSelectedPair(selectedUserCard, selectedTweetCard);
            }
        }
    });

    $('body').on('click', '.imgLink', function(event) {
        event.stopPropagation();
    });

    /**
     * [If click happens on any link in a card, stops traversing up the DOM tree and doesn't select the card]
     */
    $('body').on('click', 'td a', function(event) {
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
            // console.log('selected correct');
            $('table').trigger('correct-selection');        //Triggering correct selection event

            selectedUserCard.toggleClass('correctSelection');
            selectedTweetCard.toggleClass('correctSelection');

            selectedCorrectUser = selectedCorrectUser + selectedUser;       //Adding user to list of correctly selected users
            selectedCorrectTweet = selectedCorrectTweet + selectedTweet;    //Adding tweet to list of correctly selected tweets
        } else {    //Selected Incorrect
            // console.log('selected incorrect');
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
    $('body').on('incorrect-selection', 'table', function(event) {
        deductTime(10);     //Deducting 10 seconds for incorrect selection
        $('.incorrectSound').trigger('play');
        incorrectMatches = incorrectMatches + 1;
        removeIncorrectSelectionProperties(500, selectedUserCard, selectedTweetCard);
    });

    /**
     * This function is listening for an event which is fired when a CORRECT selection is made in the table
     */
    $('body').on('correct-selection', 'table', function(event) {
        correctMatches = correctMatches + 1;
        if (correctMatches === 10) {
            var endEvent = $.Event('endGame');
            endEvent._all = true;
            endEvent.timeLeft = $('.timer').TimeCircles().getTime();
            // console.log(endEvent);
            $('body').trigger(endEvent);
        }
        $('.correctSound').trigger('play');
        addCorrectSelectionProperties(0, selectedUserCard, selectedTweetCard);

        var remainingTime = $('.timer').TimeCircles().getTime();
        // console.log('Got time: ' + remainingTime);

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
        var tempScore = 50 + Math.floor((Math.pow(1.05, time) * (correctMatches)));
        var temp = score;
        score = score + tempScore;
        temp = score - temp;
        // console.log('***************Step for ' + correctMatches + ' : ' + temp + '   **************');
        return score;
    }

    /**
     * This function is listening for an event which is fired when the time has run out which implies that the game has ended
     */
    $('body').on('endGame', function(event) {
        // console.log(event);
        finalTimeLeft = Math.floor(event.timeLeft);
        score = score + Math.floor((event.timeLeft)*20);
        $('table').remove();
        $('.timer').TimeCircles().destroy();
        $('.timer').remove();
        $('.score').remove();
        addEndInformation();

    });

    function addEndInformation () {
        var tempHTML = '';

        var defaultProfileLinks = ["www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-bad-werewolf.png", "www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-knives-ninja.png", "www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-foxy-fox.png", "www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-ponsy-deer.png", "www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-nerd-pug.png"];

        $.ajax({
            url: "php/scoreQueries.php?query=record_score&name='anonymous'&timeRemaining=" + finalTimeLeft + "&score=" + score + "&correct=" + correctMatches + "&incorrect=" + incorrectMatches + "&profile_pic='" + defaultProfileLinks[Math.floor(Math.random()*5)] + "'",
            type: "POST",
            success: function (response) {
                // console.log("DATA POSTED TO DATABASE");
            }
        });

        tempHTML = tempHTML + '<div class="endInfo">';
        tempHTML = tempHTML + '    <div class="finalScore">';
        tempHTML = tempHTML + '        <p>Your Score:<span>' + score + '</span></p>';
        tempHTML = tempHTML + '    </div>';
        tempHTML = tempHTML + '    <div class="attempts">';
        tempHTML = tempHTML + '        <div class="correct">';
        tempHTML = tempHTML + '            <p>Correct Attempts: ' + correctMatches + '</p>';
        tempHTML = tempHTML + '        </div>';
        tempHTML = tempHTML + '        <div class="incorrect">';
        tempHTML = tempHTML + '            <p>Incorrect Attempts: ' + incorrectMatches + '</p>';
        tempHTML = tempHTML + '        </div>';
        tempHTML = tempHTML + '    </div>';
        tempHTML = tempHTML + '    <div class="survey">';
        tempHTML = tempHTML + '        <a href="https://tweetysurvey.typeform.com/to/m1GIH1" target="_blank"><p>Please take our survey to make this game better</p></a>';
        tempHTML = tempHTML + '    </div>';
        tempHTML = tempHTML + '    <div class="buttons">';
        tempHTML = tempHTML + '        <button class="answers">Answers</button>';
        tempHTML = tempHTML + '        <button class="playAgain">Play Again</button>';
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

    $('body').on('click', '.playAgain', function(event) {
        location.reload();
    });

    $('body').on('click', '.logoImg', function(event) {
        location.reload();
    });

    /**
     * Function is called when time needs to be duducted from the running timer.
     * @param  {[Integer]} deduction [Amout of time in SECONDS to be deducted]
     */
    function deductTime(deduction) {
        var tmp = $('.timer').TimeCircles().getTime();
        // console.log(tmp);
        tmp = Math.floor((tmp-deduction));
        // console.log(tmp);

        if (tmp <= 0) {
            var endEvent = $.Event('endGame');
            endEvent._all = false;
            endEvent.timeLeft = 0;
            $('body').trigger(endEvent);
        } else {
            /**
             * At this point tmp hold the new time after deduction.
             * eg: Incorrect selection occured at 115s
             *     tmp now holds 105
             */
            $(".timer").data('timer', tmp).TimeCircles().restart();
        }
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
                endEvent.timeLeft = total;
                // console.log(endEvent);
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
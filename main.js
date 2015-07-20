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

    var peopleJSON = CreateUserTweetGameObject();
    console.log(peopleJSON);

    /* Creating table */
    createTable(peopleJSON);


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
        var clickedTagLocalName = event.toElement.localName;
        console.log(event);

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
        var block = $(this);
        var localSelectedUser = block.find('.userInfo').find('.userHandle')['0']['innerText'].replace('@', '');

        if(!(selectedCorrectUser.indexOf(localSelectedUser) >= 0)) {
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
    });

    //Highlighting the selected card (tweetCard)
    $('.tweetCard').on('click', function(event) {
        console.log('click on tweetCard');
        var clickedClassName = event.toElement.className;

        var block = $(this);
        var localSelectedTweet = block.parent('td').siblings('td').find('.userCard').find('.userInfo').find('.userHandle')['0']['innerText'].replace('@', '');

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
     * Removes red shadow from an incorrectly selected pair after time 'time'
     * NOTE: Tried doing this inside parseSelectedPair(userBlock, tweetBlock) but timeout needed to be defined
     *       with new object.
     * @param  {[int]} time              [Delay in milliseconds after which the shadow should be removed]
     * @param  {[Object]} userCardSelected  [User card that was selected]
     * @param  {[Object]} tweetCardSelected [Tweet Card that was selected]
     */
    function removeIncorrectSelectionShadow(time, userCardSelected, tweetCardSelected) {
        var localUserCardSelected = $.extend(true, {}, userCardSelected)
        var localTweetCardSelected = $.extend(true, {}, tweetCardSelected)

        setTimeout(function() {
            localUserCardSelected.toggleClass('incorrectSelection');
            localTweetCardSelected.toggleClass('incorrectSelection');
        }, time);
    }

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
        selectedUser = userBlock.find('.userInfo').find('.userHandle')['0']['innerText'].replace('@', '');
        selectedTweet = tweetBlock.parent('td').siblings('td').find('.userCard').find('.userInfo').find('.userHandle')['0']['innerText'].replace('@', '');

        if(correctOrder[selectedUser]['tweetInfo']['tweetID'] == incorrectOrder[selectedTweet]['tweetInfo']['tweetID']) {
            console.log('selected correct');
            selectedUserCard.toggleClass('correctSelection');
            selectedTweetCard.toggleClass('correctSelection');

            selectedCorrectUser = selectedCorrectUser + selectedUser;       //Adding user to list of correctly selected users
            selectedCorrectTweet = selectedCorrectTweet + selectedTweet;    //Adding tweet to list of correctly selected tweets
        } else {
            console.log('selected incorrect');

            selectedUserCard.toggleClass('incorrectSelection');
            selectedTweetCard.toggleClass('incorrectSelection');

            removeIncorrectSelectionShadow(500, selectedUserCard, selectedTweetCard);

        }

        selectedUserCard.toggleClass('selectedCard');
        selectedTweetCard.toggleClass('selectedCard');
        selectedUserCard = undefined;
        selectedTweetCard = undefined;
        hasSelectedUser = false;
        hasSelectedTweet = false;
    }
});
$(document).ready(function(){

    var people = $.getJSON('people.json',function(){
    });


    /**
    * This method provides a JSON object containing the information about a tweet given a 
    * Twitter handle.
    *
    * @param twitterHandle: The Twitter Handle (@xyz) of the User whose Tweet is being collected
    *
    * @returns gameTweet: JSON data of one random tweet from recent 200 for the user
    */
    function GetTweet(twitterHandle){

        // Twitter handle is considered as the Screen-Name
        var screenName = twitterHandle;

        // Getting content for the latest 200 tweets by the user
        var count = 200;

        // AJAX request 20 get 200 tweet data
        var tweetData = $.ajax({
            url: "http://midnightjabber.com/tweets_json.php?screen_name=" + screenName + "&count=" + String(count),
            async: false
        });

        var tweetArr = JSON.parse(tweetData['responseText']);
        
        // Out of 200 tweets lets select a random tweet
        // Math.random() never equals 1 but it can be 0 or some value between 0 and 1
        var randomIndex = Math.floor((Math.random() * 200) + 0);

        // Tweet that got selected
        var gameTweet = tweetArr[randomIndex];

        return gameTweet;
    }


    /**
    * This method selects 10 random people from the a JSON file with an array of people/users.
    *
    * @param people: Object with the list of all the people (In our game)
    * @param numPeople: Number of random people
    * @returns gamePeople: 10 random people from the provided JSON file
    */
    function GetRandomGamePeople(people, numPeople){

        var gamePeople = [];
        var twitterUsersJSON;
        var twitterUsersArr

        var peopleObj = JSON.parse(people['responseText']);

        twitterUsersArr = peopleObj['users'];

        // Now we select 10 random users
        for (i = 0; i < numPeople; i++){

            var rand = Math.floor((Math.random() * twitterUsersArr.length) + 0);

            gamePeople.push(twitterUsersArr[rand]);

            // So that no person is selected more than once
            twitterUsersArr.splice(rand, 1);
        }

        return gamePeople;
    }


    /**
    * This method creates the "correct"  and "incorrect" objects containing array of User-Tweet objects for the game. 
    * This method creates an object of a particular JSON structure (see ExampleData.json for structure).
    * 
    * @returns gameObj : Object containing the 'correct' and the 'incorrect'
    */
    function CreateUserTweetGameObject(){

        // Get List of People(handle, screenname) Objects 
        var gamePeople = GetRandomGamePeople(people, 10);

        // Declare main Game Object
        var gameObj = {};
        gameObj['correct'] = {};
        gameObj['incorrect'] = {};

        // Objects for each Person
        var userObj = {};
        var tweetObj = {};

        gamePeople.forEach(function(person){

            // Get a random tweet for the person
            // Substring Method is used to remove the '@' before the handle
            var tweet = GetTweet(person['handle'].substring(1));

            userObj = {};
            tweetObj = {};

            // Fill in User Object Details
            userObj['name'] = tweet['user']['name'];
            userObj['handle'] = '@' + tweet['user']['screen_name'];
            userObj['profilePicURL'] = tweet['user']['profile_image_url'];
            userObj['followURL'] = "https://twitter.com/intent/follow?screen_name=" + userObj['handle'];

            // Correct Person User Info
            gameObj['correct'][tweet['user']['screen_name']] = {};
            gameObj['correct'][tweet['user']['screen_name']]['userInfo'] = userObj;

            // Incorrect Person User Info
            gameObj['incorrect'][tweet['user']['screen_name']] = {};
            gameObj['incorrect'][tweet['user']['screen_name']]['userInfo'] = userObj;

            // Fill in Tweet Object Details
            tweetObj['tweetID'] = tweet['id'];
            tweetObj['tweetDate'] = tweet['created_at'];
            tweetObj['tweetHTML'] = GetTweetHTML(tweet);
            tweetObj['tweetText'] = tweet['text'];
            tweetObj['numOfRetweets'] = tweet['retweet_count'];
            tweetObj['numOfFavorites'] = tweet['favorite_count'];

            gameObj['correct'][tweet['user']['screen_name']]['tweetInfo'] = tweetObj;

        });

        var keys = Object.keys(gameObj['correct']);

        // Duplicate of keys
        var allPeople = Object.keys(gameObj['correct']);

        for (i = 0; i < allPeople.length; i++){

            var rand = Math.floor((Math.random() * keys.length) + 0);

            gameObj['incorrect'][allPeople[i]]['tweetInfo'] = gameObj['correct'][allPeople[rand]]['tweetInfo'];

            // So that no person's tweet is selected more than once
            keys.splice(rand, 1);
        }

        return gameObj;
    }


    /**
    * This method creates the HTML text suited for the Game Application.
    *
    * @param tweet : Tweet Object provided by the Twitter API
    *
    * @returns : HTML text of the Tweet that can directly be used for the App 
    */
    function GetTweetHTML(tweet){

        var intToString = ["Zero", "One", "Two", "Three", "Four", "Five"];

        var mediaString = "";

        // HTML Tweet Text that needs to be returned
        var tweetHTML = "";

        // Text of the Tweet
        var tweetText = tweet['text'];

        // Array of words in the Tweet
        var tweetWords = tweet['text'].split(" ");

        var hashtags = tweet['entities']['hashtags'];
        var symbols = tweet['entities']['symbols'];
        var urls = tweet['entities']['urls'];
        var media = tweet['entities']['media'];
        var userMentions = tweet['entities']['user_mentions'];

        // Replace all the Hashtags with hashtag links
        if(hashtags != undefined && hashtags['length'] > 0){

            hashtags.forEach(function(hashtag){

                tweetText = tweetText.replace('#' + hashtag['text'], '<a class="hashtagLink" target="_blank" href="https://twitter.com/hashtag/' + hashtag['text'] + '?src=hash">#' + hashtag['text'] + '</a>');
            });
        }

        // Replace all the user-Mentions with User Links
        if(userMentions != undefined && userMentions['length'] > 0){

            userMentions.forEach(function(user){

                tweetText = tweetText.replace('@' + user['screen_name'], '<a class="userMentionLink" target="_blank" href="https://twitter.com/' + user['screen_name'] + '">@' + user['screen_name'] + '</a>');
            });
        }

        // Replace is all the Media Content with HTML Links
        // Twitter Dev URL: https://dev.twitter.com/overview/api/entities-in-twitter-objects#media
        // NOTE: The media type (media['type']) for now only supports 'photo'. If later it supports more
        // media content such as video etc, that also needs to be taken care of in the Application.
        if(media != undefined && media['length'] > 0){

            var index = 1;

            media.forEach(function(mediaEle){

                // TODO --> Ask for Width and height Properties and set them for the image
                tweetText = tweetText.replace(mediaEle['url'], '<div class="imgLink link' + intToString[index] + '">' + mediaEle['url'] + '</div>');
                mediaString += '<img class="tweetImg link' + intToString[index] + '" width="450px" style="display: none;" height="auto" src="' + mediaEle['media_url'] + '">';
                index += 1;
            });
        }   

        // Replace all the Url(s) with the HTML links for the Url(s)
        if(urls != undefined && urls['length'] > 0){

            urls.forEach(function(url){

                tweetText = tweetText.replace(url['url'], '<a class="webLink" target="_blank" href="' + url['expanded_url'] + '">' + url['url'] + '</a>');
            });

        }

        // Replace all the Symbols with the Symbol HTML Links
        if(symbols != undefined && symbols['length'] > 0){

            symbols.forEach(function(symbol){

                tweetText = tweetText.replace('$' + symbol['text'], '<a class="symbolLink" target="_blank" href="https://twitter.com/search?q=$' + symbol['text'] + '&src=tyah">$' + symbol['text'] + '</a>');
            });
        }
        
        tweetHTML = '<p>' + tweetText + mediaString + '</p>';
        return tweetHTML;

    }

});


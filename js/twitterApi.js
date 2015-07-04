
/**
* This method provides a JSON object containign the information about a tweet given a 
* Twitter screen-name and a Twitter handle.
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
		})

	var tweetArr = JSON.parse(tweetData['responseText']);
	
	// Out of 200 tweets lets select a random tweet
	// Math.random() never equals 1 but it can be 0 or some value between 0 and 1
	var randomIndex = Math.floor((Math.random() * 200) + 0);

	// Tweet that got selected
	var gameTweet = tweetArr[randomIndex];

	return gameTweet;
}


/**
*
*
*
* @returns 
*/
function GetRandomGamePeople(){

	var gamePeople = [];

	return gamePeople;
}
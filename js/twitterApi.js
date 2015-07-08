

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

			// Fill in User Object Details
			userObj['name'] = tweet['user']['name'];
			userObj['handle'] = '@' + tweet['user']['screen_name'];
			userObj['profilePicURL'] = tweet['user']['profile_img_url'];
			userObj['followURL'] = "https://twitter.com/intent/follow?screen_name=" + userObj['handle'];

			gameObj['correct'][tweet['user']['name']] = {};
			gameObj['correct'][tweet['user']['name']]['userInfo'] = userObj;


			// Fill in Tweet Object Details
			tweetObj['tweetID'] = tweet['id'];
			tweetObj['tweetDate'] = tweet['created_at'];
			tweetObj['tweetHTML'] = // TODO --> Add a function that takes in tweet and then create the HTML tweet text for return.
			tweetObj['tweetText'] = tweet['text'];
			tweetObj['numOfRetweets'] = tweet['retweet_count'];
			tweetObj['numOfFavorites'] = tweet['favorite_count'];

			// TODO --> Add tweet object to the Game Object

		});

		// TODO --> create shuffled incorrect object 

		return gameObj;
	}


});


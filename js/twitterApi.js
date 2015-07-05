

$(document).ready(function(){

	var people = $.getJSON('people.json',function(){
	});

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

			console.log(twitterUsersArr.length);
		}

		return gamePeople;
	}


});


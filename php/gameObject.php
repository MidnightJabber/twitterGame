<?php
/// This script creates a random 'Game Object' that runs good for one game.
/// The script can be called whenever a new Game Object is needed and this
/// script will randomly generate a new Game Object for the Tweety-Twitter Game.
///
/// Author: Vishrut Reddi
/// MidnightJabber (c) 2015 - 2016 

//Connect Connection Script
include("connection.php");

// To log data
include("logger.php");


// Global array of what all Twitter User ID's have been used for the game
$alreadyUsedIDs = array();

echo createGameObject();


/**
* This method finds and provides the total number of Twitter Users in the Database.
*
* @return noOfUsers :: The total number of Twitter Users in the DB
*/
function getNumberOfTwitterUsers(){

	$link = getConnection();

	$query = "SELECT Count(*) FROM TwitterUsers;";
	$res = mysqli_query($link,$query);

	$noOfUsers = 0;

	while($row = $res->fetch_array()){

		$noOfUsers = $row[0];
	}

	return $noOfUsers;
}


/**
* This method randomly finds specified number of Twitter Users from the selected Twitter Users
* for the game that are stored in the Tweety DB.
*
* @param count :: The number of random users requested (NOTE: It should never be more than the total Twitter Users in Tweety DB)
*
* @return Array of Twitter User Handles
*/
function getRandomTwitterUsers($count){

	// Get Connection Link
	$link = getConnection();

	// Construct and Execute the Query
	$query = "SELECT * FROM TwitterUsers;";
	$res = mysqli_query($link,$query);

	$allUsers = array();

	while($row = $res->fetch_array()){

		$userHandle = $row['TwitterHandle'];
		array_push($allUsers, $userHandle);
	}

	$totalUsers = count($allUsers);

	// Twitter Users selected for the Game Object
	$gameUsers = array();

	for($i = 0; $i < $count; $i++){


		$rand = mt_rand(0,$totalUsers - 1);

		while(in_array($rand, $GLOBALS['alreadyUsedIDs'])){

			$rand = mt_rand(0,$totalUsers - 1);
		}

		array_push($GLOBALS['alreadyUsedIDs'], $rand);
		array_push($gameUsers, $allUsers[$rand]);
	}

	return $gameUsers;
}


/**
* This method creates a game object that is good for one game session. Everytime a game object is created, it is all random.
* The twitter users, their tweet, all random. 
*
* NOTE: This method logs a bunch of stuff in a new live log html file called "gameSelectionLogs.html". This is done 
*       because even though the game object is created there is a minor glitch in creation of the game object. Some 
*       Tweets do not work when doing json_decode ("enigma-bug"). Sometiumes it works sometimes it doesnt. 
*
* @return gameObject :: A json form string that could be converted into json in JS easily.
*/
function createGameObject(){

	// Get random 10 Twitter Users
	$twitterUsers = getRandomTwitterUsers(10);
	
	// Get Connection Link
	$link = getConnection();

	$correct = array();
	$incorrect = array();
	$userKeys = array();

	foreach($twitterUsers as $user){
		
		// Select a random number between 1 and 200
		$rand = mt_rand(1, 200);
		
		logInfo("gameSelectionLogs.html", "Grabbing Tweet Number: " . $rand . " for Twitter User: " . $user . " from the DB.");

		$query = "SELECT TwitterResp FROM Tweets WHERE Number = ".(string)$rand." AND TwitterHandle = \"".$user."\";";
		$res = mysqli_query($link, $query);

		$row = $res->fetch_array();

		// Get the textual tweet response form the DB
		$twitterResp = $row[0];

		// Convert that text to associative array
		$twitterRespJson = json_decode($twitterResp,true, 200000);
		
		// Creating a new user variable jsut in case the last one fails
		$newUser = $user;

		// If it fails...
		while($twitterRespJson == null){
			
			logError("gameSelectionLogs.html", "Conversion of Tweet Response text from DB to JSON in PHP failed.");
			logInfo("gameSelectionLogs.html", "Finding a new random Twitter User for the game...");

			// Get new random twitter user
			$newUser = getRandomTwitterUsers(1);
			$newUser = $newUser[0];

			// Select a random number between 1 and 200
			$rand = mt_rand(1, 200);
		
			logInfo("gameSelectionLogs.html", "Grabbing Tweet Number: " . $rand . " for Twitter User: " . $newUser . " from the DB.");

			$query = "SELECT TwitterResp FROM Tweets WHERE Number = ".(string)$rand." AND TwitterHandle = \"".$newUser."\";";
			$res = mysqli_query($link, $query);

			$row = $res->fetch_array();

			// Grab the Twitter Response as text from the DB
			$twitterResp = $row[0];
		
			$twitterRespJson = json_decode($twitterResp,true, 20000);						
		}

		logSuccess("gameSelectionLogs.html", "User: " . $newUser . " with Tweet Number: " . $rand . " has been selected for the game.");
	
		// If Everything went OK
		if($twitterResp != ""){

			$response = $twitterRespJson;

			$userObj = array(
				'name' => $response['user']['name'],
				'handle' => '@' . $response['user']['screen_name'],
				'profilePicURL' => str_replace("_normal", "", $response['user']['profile_image_url']),
				'followURL' => "https://twitter.com/intent/follow?screen_name=" . '@' . $response['user']['screen_name']
				);
				
				//var_dump($userObj);
			
			$tweetObj = array(
				'tweetID' => $response['id'],
				'tweetDate' => $response['created_at'],
				'tweetHTML' => getTweetHTML($response),
				'tweetText' => $response['text'],
				'numOfRetweets' => $response['retweet_count'],
				'numOfFavorites' => $response['favorite_count']
				);

			$unit = array(
				'userInfo' => $userObj,
				'tweetInfo' => $tweetObj
				);

			array_push($userKeys, $response['user']['screen_name']);
			$correct[$response['user']['screen_name']] = $unit;
		}
	}

	logInfo("gameSelectionLogs.html", "'Correct' part of the game object has been COMPLETED. Starting the construction of 'incorrect' part of the game object.");

	$incorrect = array();

	// Variable to log the final Game Layout.
	$gameObjectLog = "";

	foreach($correct as $unit){

		$rand = $rand = mt_rand(0, count($userKeys) - 1);

		// Swap that random number with the last user in the userKeys array
		if(count($userKeys) != 0){

			$temp = $userKeys[count($userKeys) - 1];
			$userKeys[count($userKeys) - 1] = $userKeys[$rand];
			$userKeys[$rand] = $temp;
		}

		// get random tweet user
		$randomTwitterUser = array_pop($userKeys);

		$gameObjectLog =  $gameObjectLog . '<b>' . substr($unit['userInfo']['handle'], 1) . '</b> has <b>' .$randomTwitterUser . '\'s</b> tweet infront of him/her in the game. <br>';
		
		// Select that random tweet from the correct part of game object and add in current incorrect unit
		$incorrect[substr($unit['userInfo']['handle'], 1)]['userInfo'] = $correct[substr($unit['userInfo']['handle'], 1)]['userInfo'];
		$incorrect[substr($unit['userInfo']['handle'], 1)]['tweetInfo'] = $correct[$randomTwitterUser]['tweetInfo'];
	}
	
	// Game object construction
	$gameObject = array(
		'correct' => $correct,
		'incorrect' => $incorrect
		);

	logSuccess("gameSelectionLogs.html", "Game Object Creation Successful. <br><u>GAME INFO:</u><br>" . $gameObjectLog);

	logInfo("gameSessionObjects.txt", json_encode($gameObject));
	return json_encode($gameObject);
}



/**
* This method takes the Twitter response object and using that object makes the desired HTML 
* format of the Tweet (Text). This HTML is the code that is used on the website. 
*
* @param tweet :: Twiiter Response Object
*
* @return tweetHTML :: HTML coded string for the tweet
*/
function getTweetHTML($tweet){

	$intToString = array("Zero", "One", "Two", "Three", "Four", "Five");

	$mediaString = "";

	// HTML Tweet Text that needs to be returned
	$tweetHTML = "";

	// Text of the Tweet
	$tweetText = $tweet['text'];

	// Array of words in the Tweet
	$tweetWords = explode(" ", $tweet['text']);

	// Replace all the Hashtags with hashtag links
	if(array_key_exists('hashtags', $tweet['entities'])){

		$hashtags = $tweet['entities']['hashtags'];

		foreach($hashtags as $hashtag){
						
			$tweetText = str_replace('#' . $hashtag['text'], '<a class="hashtagLink" target="_blank" href="https://twitter.com/hashtag/' . $hashtag['text'] . '?src=hash">#' . $hashtag['text'] . '</a>', $tweetText);
		}
	}

	// Replace all the user-Mentions with User Links
	if(array_key_exists('user_mentions', $tweet['entities'])){

		$userMentions = $tweet['entities']['user_mentions'];

		foreach($userMentions as $user){
					
			$tweetText = str_replace('@' . $user['screen_name'], '<a class="userMentionLink" target="_blank" href="https://twitter.com/' . $user['screen_name'] . '">@' . $user['screen_name'] . '</a>', $tweetText);
		}
	}

	// Replace is all the Media Content with HTML Links
	// Twitter Dev URL: https://dev.twitter.com/overview/api/entities-in-twitter-objects#media
	// NOTE: The media type (media['type']) for now only supports 'photo'. If later it supports more
	// media content such as video etc, that also needs to be taken care of in the Application.
	if(array_key_exists('media', $tweet['entities'])){

		$index = 1;

		$media = $tweet['entities']['media'];
		foreach($media as $mediaEle){

			
			// TODO --> Ask for Width and height Properties and set them for the image
			$tweetText = str_replace($mediaEle['url'], '<div class="imgLink link' . $intToString[$index] . '">' . $mediaEle['url'] . '</div>', $tweetText);
			$mediaString = $mediaString . '<img class="tweetImg img' . $intToString[$index] . '" width="450px" style="display: none;" height="auto" src="' . $mediaEle['media_url'] . '">';
			$index += 1;
		}
	}

	// Replace all the Url(s) with the HTML links for the Url(s)
	if(array_key_exists('urls', $tweet['entities'])){

		$urls = $tweet['entities']['urls'];

		foreach($urls as $url){
			
			$tweetText = str_replace($url['url'], '<a class="webLink" target="_blank" href="' . $url['expanded_url'] . '">' . $url['url'] . '</a>', $tweetText);
		}

	}

	// Replace all the Symbols with the Symbol HTML Links
	if(array_key_exists('symbols', $tweet['entities'])){

		$symbols = $tweet['entities']['symbols'];

		foreach($symbols as $symbol){
			
			$tweetText = str_replace('$' . $symbol['text'], '<a class="symbolLink" target="_blank" href="https://twitter.com/search?q=$' . $symbol['text'] . '&src=tyah">$' . $symbol['text'] . '</a>', $tweetText);
		}
	}

	$tweetHTML = '<p>' . $tweetText . $mediaString . '</p>';
	return $tweetHTML;
}

?>
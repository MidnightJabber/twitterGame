<?php
/// This PHP script would run as a CRON JOB. This script would be executing every
/// 24 hours updating the Database with recent 200 tweets for every participating 
/// Twitter User in the game. 
/// The CRON JOB would be logging the updating data every 24 hours.
/// 
/// NOTE: This is the only script that will interact with the Twitter Data (throguh API) 
///       directy. All the players of the Tweety Twitter Game would be interacting with the 
///       local DB for the Game Object.
///
/// Author: Vishrut Reddi
/// MidnightJabber (c) 2015 - 2016 


// Got it from: https://github.com/themattharris/tmhOAuth
require 'tmhOAuth.php'; 

//Connect Connection Script
include("connection.php");

// To log data
include("logger.php");

// Use the data from http://dev.twitter.com/apps to fill out this info
// notice the slight name difference in the last two items)


// Log a new session start
logInfo('tweetylogs.txt', 'New Session Starting.');
logInfo('info.txt', 'New Session Starting.');
logInfo('tweetylogs.html', '<b>New Session Starting</b>');

insertTweetInDB();
//getTweet('@katyperry', 200);


/**
* This method retreives all the Twitter user handles from the local DB (midnight_tweety).
* All the handles exist inside the table 'TwitterUsers'.
*
* NOTE: Each handle has '@' infront of it.
*       Each handle is a string and not an object containing a string.
*
* @return JSON OBJ {"result": [ __Array_of_handles__]}
*/
function getAllTwitterUsers(){

  	$query = "SELECT TwitterHandle FROM TwitterUsers ORDER BY UserID;";

  	// Execute the query
	$res = mysqli_query(getConnection(),$query);
	$result = array();

	if(mysqli_num_rows($res) >=1) {

	    while($row = $res->fetch_array()) {
	        
	        array_push($result,$row['TwitterHandle']);
	    }
	}
	else {}

	// Get Info about logging data
	$rowsFromDB = mysqli_num_rows($res);
	
	$usersGrabbed = "";

	foreach($result as $user){
		$usersGrabbed = $user . " | ";
	}

	// Logging Data
	if($rowsFromDB == count($result)){

		logSuccess('tweetylogs.txt', 'Grabbed ' . $rowsFromDB . ' Twitter Users for the new Session of refreshing Tweet Data. All Twitter Users were grabbed. Users that were grabbed are the following: ' . $usersGrabbed);
		logSuccess('success.txt', 'Grabbed ' . $rowsFromDB . ' Twitter Users for the new Session of refreshing Tweet Data. All Twitter Users were grabbed. Users that were grabbed are the following: ' . $usersGrabbed);
		logSuccess('tweetylogs.html', 'Grabbed <b>' . $rowsFromDB . '</b> Twitter Users for the new Session of refreshing Tweet Data. All Twitter Users were grabbed. Users that were grabbed are the following: <br>' . $usersGrabbed);

	}
	else{

		logWarning('tweetylogs.txt', 'Grabbed ' . count($result) . ' Twitter Users for the new Session of refreshing Tweet Data. All Twitter Users were not Grabbed. Users that were grabbed are the following: ' . $usersGrabbed);
		logWarning('warning.txt', 'Grabbed ' . count($result) . ' Twitter Users for the new Session of refreshing Tweet Data. All Twitter Users were not Grabbed. Users that were grabbed are the following: ' . $usersGrabbed);
		logWarning('tweetylogs.html', 'Grabbed <b>' . count($result) . '</b> Twitter Users for the new Session of refreshing Tweet Data. All Twitter Users were not Grabbed. Users that were grabbed are the following: <br>' . $usersGrabbed);
	}

	return array("result" => $result);
} 


/**
* This method uses the Twitter API to get specified amount of Tweet Responses
* from Twitter for a specified Twitter User.
*
* @param screenName :: The Twitter Handle for which we require the tweets
* @param count :: The number of recent tweets needed for the Twitter User
*
* @return response :: Array of Twitter Response Objects
*/
function getTweet($screenName, $count){

	$parameters = array();

	$parameters['screen_name'] = $screenName;
	$parameters['count'] = $count;

	$connection = new tmhOAuth(array(	
  	'consumer_key' => 'C8U6aOYWFkfuPxOiFBxoF87jF',
	'consumer_secret' => 'cODzOUcJSqd3ATG15J25GXZlz7AyhK6gHbRCmsCiMIn0rfMKIu',
	'user_token' => '2261472366-CPKf4pZ9fosiZ2zCQfXi7tiexIzbiNfzJ8lEcoC', //access token
	'user_secret' => 'gH6qWAAOCrmS38sf5ipaXIxHZHLHNGtYOmCZcJrFli0M9' //access token secret
	));

	$twitterPath = '1.1/statuses/user_timeline.json';

	$http_code = $connection->request('GET', $connection->url($twitterPath), $parameters);

	// If everything is good
	if ($http_code === 200) { 
		
		$response = strip_tags($connection->response['response']);

		$twitterResp = json_decode($response, true);

		// Log Success
		if(count($twitterResp) == 200){

			logSuccess('tweetylogs.txt', 'Grabbed 200 Tweets for ' . $screenName . ' from the Twitter API.');
			logSuccess('success.txt', 'Grabbed 200 Tweets for ' . $screenName . ' from the Twitter API.');
			logSuccess('tweetylogs.html', 'Grabbed <b>200</b> Tweets for <b>' . $screenName . '</b> from the Twitter API.');
		}
		// Log Warning
		else{

			logWarning('tweetylogs.txt', 'Grabbed ' . (string)count($twitterResp) . ' Tweets for' . $screenName . ' from the Twitter API.');
			logWarning('warning.txt', 'Grabbed ' . (string)count($twitterResp) . ' Tweets for' . $screenName . ' from the Twitter API.');
			logWarning('tweetylogs.html', 'Grabbed <b>' . (string)count($twitterResp) .'</b> Tweets for <b>' . $screenName . '</b> from the Twitter API.');
		}

		return $twitterResp;
	} 	

	// If somthing messed up, Log Error
	else {

		logError('tweetylogs.txt', 'Error in the function refreshData.php/getTweet() for Twitter User: ' . $screenName . '. HTTP Code not 200. HTTP Code/Error ID: ' . $http_code . '. Error: ' . $connection->response['error']);
		logError('error.txt', 'Error in the function refreshData.php/getTweet() for Twitter User: ' . $screenName . '. HTTP Code not 200. HTTP Code/Error ID: ' . $http_code . '. Error: ' . $connection->response['error']);
		logError('tweetylogs.html', 'Error in the function refreshData.php/getTweet() for Twitter User: <b>' . $screenName . '</b>. HTTP Code not 200. <b>HTTP Code/Error ID:</b> ' . $http_code . '. <b>Error:</b> ' . $connection->response['error']);
	}
}


/**
* This method deletes all the tuples from the Tweets Table. This should/can be done when refreshing/updating
* the data in the table. Old tuples will be deleted and new will be added.
*
* TODO --> Could be made better by just inserting the newTwitter Responses in the table and not removing all and re-inserting all. [DONE]
* [This function is no longer needed.]
*/
function clearTweetsTable(){


  	$query = "DELETE FROM Tweets;";

  	// Execute the Query
	$res = mysqli_query(getConnection(),$query);
}


/**
* This is the method that inserts 200 recent Twitter response objects with their Twitter handles in 
* the DB (Table: Tweets). 
*/
function insertTweetInDB(){

	//$users = array("result" => ["@katyperry"]);
	$users = getAllTwitterUsers();

	$twitterApiCallCount = 0;
	foreach ($users['result'] as $user) {
		
		if($twitterApiCallCount % 180 == 0 && $twitterApiCallCount != 0){

			// Sleep for 15mins and 30 seconds
			break;
		}
		
		// strip the initial character '@' and get 200 Twitter Responses for that screen-name.
		$twitterResp = getTweet(substr($user, 1), 200);

		$twitterApiCallCount += 1;
		$count = 1;

		mysqli_query(getConnection(), "START TRANSACTION;");

		foreach($twitterResp as $response){

			$response["source"] = str_replace('"', '\"', $response["source"]);
			$response["text"] = str_replace('"', '\"', $response["text"]);
			$object = json_encode($response);
			// Escaping all the ' character from the Tweet Data
			$object = str_replace("'","\'", $object);

			$query = "REPLACE INTO Tweets(Number, TwitterHandle, TwitterResp) VALUES('".(string)$count."', '".$user."', '".$object."');";

			$count += 1;

			$res = mysqli_query(getConnection(),$query);
			
			if(false === $res) {

				logWarning('tweetylogs.txt', "Insertion for Tweet #" . $count . " for Twitter User " . $user . " failed. Insertion error: " . mysqli_error($link));
				logWarning('warning.txt', "Insertion for Tweet #" . $count . " for Twitter User " . $user . " failed. Insertion error: " . mysqli_error($link));
				logWarning('tweetylogs.html', "Insertion for <b>Tweet #" . $count . "</b> for <b>Twitter User " . $user . "</b> failed. Insertion error: " . mysqli_error($link));
			}

		}

		if($count >= 200){
			logSuccess('tweetylogs.txt', "Insertion for 200 Tweets for Twitter User " . $user . " succeded.");
			logSuccess('warning.txt', "Insertion for 200 Tweets for Twitter User " . $user . " succeded.");
			logSuccess('tweetylogs.html', "Insertion for 200 Tweets for <b>Twitter User " . $user . "</b> succeded.");
		}

		mysqli_query(getConnection(), "COMMIT;");
	}

}

?>
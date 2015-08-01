<?php
/// 
///
///
///
/// 
/// Author: Vishrut Reddi
/// MidnightJabber (c) 2015 - 2016 


// Got it from: https://github.com/themattharris/tmhOAuth
require 'tmhOAuth.php'; 

//Connect Connection Script
include("connection.php");

// Use the data from http://dev.twitter.com/apps to fill out this info
// notice the slight name difference in the last two items)

// We need new recent 200 tweets for each user
$count = 200;


insertTweetInDB();


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

	$res = mysqli_query(getConnection(),$query);
	$return_trip = "";
	$result = array();

	if(mysqli_num_rows($res) >=1) {

	    while($row = $res->fetch_array()) {
	        
	        array_push($result,$row['TwitterHandle']);
	    }
	}
	else {}

	return array("result" => $result);
} 


/**
*
*
* @return response :: Array of Twitter Response Objects
*/
function getTweet($screenName, $count){

	$parameters = array();

	$parameters['screen_name'] = $screenName;
	$parameters['count'] = $count;

	$connection = new tmhOAuth(array(	
  	'consumer_key' => 'WyntYi4cWQiqX2I8QPQUGogsE',
	'consumer_secret' => 'lTohGkEnm2ETyaKjuEY149evHvudDNgjTDDHKZVSnYkmBHqX5X',
	'user_token' => '64123852-0SjQ1rn5SKJWguZxuvQPm7eTafcV4KP9QdQXnt378', //access token
	'user_secret' => 'iU2Dt3Gw8QBfQ6jMS7T11m7EUlzhDEuVaZSYQIFZ7OudI' //access token secret
	));

	$twitterPath = '1.1/statuses/user_timeline.json';

	$http_code = $connection->request('GET', $connection->url($twitterPath), $parameters);

	// If everything is good
	if ($http_code === 200) { 
		
		$response = strip_tags($connection->response['response']);

		// echo $response;

		return json_decode($response, true);
	} 	

	// If somthing messed up
	else {
		echo "Error ID: ",$http_code, "<br>\n";
		echo "Error: ",$connection->response['error'], "<br>\n";
	}
}



/**
*
*
*
*/
function insertTweetInDB(){

	$users = array("result" => ["@katyperry"]);

	foreach ($users['result'] as $user) {
		
		// strip the initial character '@' and get 200 Twitter Responses for that screen-name.
		$twitterResp = getTweet(substr($user, 1), 10);

		$count = 1;

		mysqli_query(getConnection(), "START TRANSACTION;");

		foreach($twitterResp as $response){

			$userObj = array(
				'name' => $response['user']['name'],
				'handle' => '@' . $response['user']['screen_name'],
				'profilePicURL' => str_replace("_normal", "", $response['user']['profile_image_url']),
				'followURL' => "https://twitter.com/intent/follow?screen_name=" . '@' . $response['user']['screen_name']
			);
			
			$tweetObj = array(
				'tweetID' => $response['id'],
				'tweetDate' => $response['created_at'],
				'tweetHTML' => getTweetHTML($response),
				'tweetText' => $response['text'],
				'numOfRetweets' => $response['retweet_count'],
				'numOfFavorites' => $response['favorite_count']
			);

			$object = array("userObj" => $userObj, "tweetObj" => $tweetObj);

			$query = "INSERT INTO Tweets(Number, TwitterHandle, TwitterResp) VALUES('".(string)$count."', '".$user."', '".json_encode($object)."');";

			// $content = json_encode($response);
			// $fp = fopen($_SERVER['DOCUMENT_ROOT']."/TweetObjects/".substr($user,1).(string)$count.".json","w");
			// fwrite($fp,$content);
			// fclose($fp);

			//sleep(1);
			$count += 1;

			$res = mysqli_query(getConnection(),$query);
			echo((string)$res);

		}
		mysqli_query(getConnection(), "COMMIT;");
	}

}


/**
*
*
*
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

	try{
		$hashtags = null;
		$hashtags = $tweet['entities']['hashtags'];
	}catch(Exception $e){
		$hashtags = null;
	}

	$symbols = $tweet['entities']['symbols'];
	$urls = $tweet['entities']['urls'];
	
	try{
		$media = null;
		$media = $tweet['entities']['media'];
	}catch(Exception $e){
		$media = null;
	}
	
	$userMentions = $tweet['entities']['user_mentions'];

	// Replace all the Hashtags with hashtag links
	if($hashtags != null && $hashtags['length'] > 0){

		foreach($hashtags as $hastag){
						
			$tweetText = str_replace('#' . $hashtag['text'], '<a class="hashtagLink" target="_blank" href="https://twitter.com/hashtag/' . $hashtag['text'] . '?src=hash">#' . $hashtag['text'] . '</a>', $tweetText);
		}
	}

	// Replace all the user-Mentions with User Links
	if($userMentions != null && $userMentions['length'] > 0){

		foreach($userMentions as $user){
					
			$tweetText = str_replace('@' . $user['screen_name'], '<a class="userMentionLink" target="_blank" href="https://twitter.com/' . $user['screen_name'] . '">@' . $user['screen_name'] . '</a>', $tweetText);
		}
	}

	// Replace is all the Media Content with HTML Links
	// Twitter Dev URL: https://dev.twitter.com/overview/api/entities-in-twitter-objects#media
	// NOTE: The media type (media['type']) for now only supports 'photo'. If later it supports more
	// media content such as video etc, that also needs to be taken care of in the Application.
	if($media != null && $media['length'] > 0){

		$index = 1;

		foreach($media as $mediaEle){

			
			// TODO --> Ask for Width and height Properties and set them for the image
			$tweetText = str_replace($mediaEle['url'], '<div class="imgLink link' . $intToString[$index] . '">' . $mediaEle['url'] . '</div>', $tweetText);
			$mediaString = $mediaString . '<img class="tweetImg img' . $IntToString[$index] . '" width="450px" style="display: none;" height="auto" src="' . $mediaEle['media_url'] . '">';
			$index += 1;
		}
	}

	// Replace all the Url(s) with the HTML links for the Url(s)
	if($urls != null && $urls['length'] > 0){

		foreach($urls as $url){
			
			$tweetText = str_replace($url['url'], '<a class="webLink" target="_blank" href="' . $url['expanded_url'] . '">' . $url['url'] . '</a>', $tweetText);
		}

	}

	// Replace all the Symbols with the Symbol HTML Links
	if($symbols != null && $symbols['length'] > 0){

		foreach($symbols as $symbol){
			
			$tweetText = str_replace('$' . $symbol['text'], '<a class="symbolLink" target="_blank" href="https://twitter.com/search?q=$' . $symbol['text'] . '&src=tyah">$' . $symbol['text'] . '</a>', $tweetText);
		}
	}

	$tweetHTML = '<p>' . $tweetText . $mediaString . '</p>';
	return $tweetHTML;
}



// You may have to download and copy http://curl.haxx.se/ca/cacert.pem
?>
<?php

require_once 'facebook-login.php';
require_once 'twitter-login.php';

// Load methods to get the homepage Stats
require_once 'scoreQueries.php';

// To connect to the Database for Score Queries
require_once 'connection.php';


// Get the query/function that needs to be performed
$query = $_REQUEST['query'];

// Turn off all error reporting
error_reporting(0);

switch((string)$query){

    case "get_homepage_response":

        echo getResponse();

        break;

    default:
        break;
}

/**
*
*
*
*/
function getResponse(){

	// Get connection to the DB
    $link = getConnection();

    // Get homepage stats
    $homepage_stats = getTweetyStats($link);

	$response = array();

	// Get Facebook response
	$fb_response = (array)json_decode(fb_login());

	// Get Twitter resposne 
	$twitter_response = (array)json_decode(twitter_login());

	if($fb_response['loggedIn'] == true){

		$response['loggedIn'] = $fb_response['loggedIn'];
        $response['fullname'] = $fb_response['fullname'];
        $response['location'] = $fb_response['location'];
        $response['player_id'] = $fb_response['player_id'];
        $response['profile_pic'] = $fb_response['profile_pic'];
        $response['gender'] = $fb_response['gender'];
        $response['link'] = $fb_response['link'];
        $response['social_media'] = $fb_response['social_media'];
        $response['logout_url'] = $fb_response['logout_url'];

		// Get player Stats from score queries
    	$player_stats = getPlayerStats($link, $response['player_id']);

    	$response['player_stats'] = $player_stats;

	}
	else if($twitter_response['loggedIn'] == true){


		$response['loggedIn'] = $twitter_response['loggedIn'];
        $response['fullname'] = $twitter_response['fullname'];
        $response['location'] = $twitter_response['location'];
        $response['player_id'] = $twitter_response['player_id'];
        $response['profile_pic'] = $twitter_response['profile_pic'];
        $response['gender'] = $twitter_response['gender'];
        $response['link'] = $twitter_response['link'];
        $response['social_media'] = $twitter_response['social_media'];
        $response['logout_url'] = $twitter_response['logout_url'];

		// Get player Stats from score queries
    	$player_stats = getPlayerStats($link, $response['player_id']);

    	$response['player_stats'] = $player_stats;

	}
	else{

		$response['loggedIn'] = false;
		$response['fb_login_url'] = $fb_response['loginUrl'];
		$response['twitter_login_url'] = $twitter_response['loginUrl'];
	}

	// Get homepage stats
	$response['homepage_stats'] = $homepage_stats;

	return json_encode($response, JSON_FORCE_OBJECT);
}

?>
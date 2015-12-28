<?php
/// This file is responsible for the Twitter related queries and TwitterLogin.
/// This file provides to the AJAX request when the website is loaded. If Twitter
/// account for the user is logged in and the permission is given to Tweety, then 
/// this script recognises that and extracts meaningful data. If the user is not 
/// logged into facebook or the peremission is not geiven to Tweety yet then a 
/// facebook login link is provided.
///
/// Author: Vishrut Reddi
/// MidnightJabber (c) 2015 - 2016


// Get the query/function that needs to be performed
$query = $_REQUEST['query'];

// Load the library files
require_once('twitter-login-OAuth-Files/OAuth.php');
require_once('twitter-login-OAuth-Files/twitteroauth.php');
// define the consumer key and secet and callback
define('CONSUMER_KEY', 'consumer_key_goes_here');
define('CONSUMER_SECRET', 'consumer_secret_goes_here');
define('OAUTH_CALLBACK', 'http://tweety.midnightjabber.com/php/twitter-login.php?query=twitter_login');


switch((string)$query){

    case "twitter_login":

        echo twitter_login();

        break;

    case "twitter_logout":

        echo twitter_logout();

        break;


    default:
        break;
}



/**
* This method logs a user into facebook. The facebook identiy is then used to playe the
* game. 
*
* @return response :: Associative Array identifying that if a user is logged in or not
*                     includding more user information if the user is logged in.
*/
function twitter_login(){

    session_start();

    $response = array();
    
    // 2. if user session not enabled get the login url
    if(!isset($_SESSION['data']) && !isset($_GET['oauth_token'])) {
        // create a new twitter connection object
        $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
        // get the token from connection object
        $request_token = $connection->getRequestToken(OAUTH_CALLBACK); 
        // if request_token exists then get the token and secret and store in the session
        if($request_token){
            $token = $request_token['oauth_token'];
            $_SESSION['request_token'] = $token ;
            $_SESSION['request_token_secret'] = $request_token['oauth_token_secret'];
            // get the login url from getauthorizeurl method
            $login_url = $connection->getAuthorizeURL($token);
        }
    }
    // 3. if its a callback url
    if(isset($_GET['oauth_token'])){
        // create a new twitter connection object with request token
        $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['request_token'], $_SESSION['request_token_secret']);
        // get the access token from getAccesToken method
        $access_token = $connection->getAccessToken($_REQUEST['oauth_verifier']);
        if($access_token){  
            // create another connection object with access token
            $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
            // set the parameters array with attributes include_entities false
            $params =array('include_entities'=>'false');
            // get the data
            $data = $connection->get('account/verify_credentials',$params);
            if($data){
                // store the data in the session
                $_SESSION['data']=$data;
                // redirect to same page to remove url parameters
                $redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
                //header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
                header('Location: http://tweety.midnightjabber.com');
            }
        }
    }

    /* 
     * PART 3 - FRONT END 
     *  - if userdata available then print data
     *  - else display the login url
    */
    if(isset($login_url) && !isset($_SESSION['data'])){

        $response['loggedIn'] = false;
        $response['loginUrl'] = $login_url;

        return json_encode($response);
    }
    else{
        // get the data stored from the session
        $data = $_SESSION['data'];

        $response['loggedIn'] = true;
        $response['fullname'] = $data->name;
        $response['location'] = $data->location;
        $response['player_id'] = $data->id;
        $response['profile_pic'] = str_replace("_normal", "", $data->profile_image_url);
        $response['gender'] = 'undefined';
        $response['link'] = 'http://twitter.com/' . $data->screen_name;
        $response['social_media'] = "Twitter";
        $response['logout_url'] = "http://tweety.midnightjabber.com/php/twitter-login.php?query=twitter_logout";

        return json_encode($response);
    } 
}


/**
* This methout logs the player out of Twitter and disconnects the Twitter account
* from Tweety.
*/
function twitter_logout(){

    session_start();

    // Unset all of the session variables.
    $_SESSION = array();

    // If it's desired to kill the session, also delete the session cookie.
    // Note: This will destroy the session, and not just the session data!
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // destroy the session
    session_destroy();

    // Go back to homepage
    header('Location: http://tweety.midnightjabber.com');
}



?>

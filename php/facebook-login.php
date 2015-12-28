<?php
/// This file is responsible for the Facebook related queries and Facebook Login.
/// This file provides to the AJAX request when the website is loaded. If facebook
/// account for the user is logged in and the permission is given to Tweety, then 
/// this script recognises that and extracts meaningful data. If the user is not 
/// logged into facebook or the peremission is not geiven to Tweety yet then a 
/// facebook login link is provided.
///
/// Author: Vishrut Reddi
/// MidnightJabber (c) 2015 - 2016


// Get the query/function that needs to be performed
$query = $_REQUEST['query'];

switch((string)$query){

    case "fb_login":

        echo fb_login();

        break;

    case "fb_logout":

        echo fb_logout();

        break;

    case "fb_share":

        $message = $_REQUEST['message'];
        $tweetyLink = "http://tweety.midnightjabber.com";

        echo fb_share($message, $tweetyLink);

        break;


    default:
        break;
}


/**
* This method shares a message and the site link on the user's facebook timeline. This is used 
* to share the user's score and other game data if needed. 
*
* @param message :: message posted on the user's facebook timeline
* @param tweetyLink :: The link posted on the user's facebook timeline
*
* @return response :: JSON Object identifying if the message has been shared on the user's facebook
*                     timeline or not.
*/
function fb_share($message, $tweetyLink){

     // Start a session (cookie)
    session_start();

    // Load facebook classes
    require_once __DIR__ . '/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php';

    // Get connection to the DB
    $link = getConnection();

    // Create an instance of facebook
    $fb = new Facebook\Facebook([
        'app_id' => 'app_id_goes_here',
        'app_secret' => 'app_secret_goes_here',
        'default_graph_version' => 'v2.4',
        ]);

    $permissions = ['email', 'publish_actions']; // optional
    $helper = $fb->getRedirectLoginHelper();

    $share = false;

    try {
        if (isset($_SESSION['facebook_access_token'])) {
            $accessToken = $_SESSION['facebook_access_token'];
        } 
        else {

            $accessToken = $helper->getAccessToken();
        }

    } 
    catch(Facebook\Exceptions\FacebookResponseException $e) {

            // When Graph returns an error
        echo 'Graph returned an error: ' . $e->getMessage();
        exit;
    } 
    catch(Facebook\Exceptions\FacebookSDKException $e) {

            // When validation fails or other local issues
        echo 'Facebook SDK returned an error: ' . $e->getMessage();
        exit;
    }


    if (isset($accessToken)) {

        if (isset($_SESSION['facebook_access_token'])) {

            $fb->setDefaultAccessToken($_SESSION['facebook_access_token']);
        } 
        else {
            
            // getting short-lived access token
            $_SESSION['facebook_access_token'] = (string) $accessToken;

            // OAuth 2.0 client handler
            $oAuth2Client = $fb->getOAuth2Client();

            // Exchanges a short-lived access token for a long-lived one
            $longLivedAccessToken = $oAuth2Client->getLongLivedAccessToken($_SESSION['facebook_access_token']);

            $_SESSION['facebook_access_token'] = (string) $longLivedAccessToken;

            // setting default access token to be used in script
            $fb->setDefaultAccessToken($_SESSION['facebook_access_token']);
        }

        // redirect the user back to the same page if it has "code" GET variable
        if (isset($_GET['code'])) {

            header('Location: http://tweety.midnightjabber.com');
        }

        // getting basic info about user
        try {

            // Data to post on the user's Facebook Timeline
            $data = ['link' => $tweetyLink, 'message' => $message, 'description' => 'Tweety: A Twitter Game'];

            // Post on Facebook
            $request = $fb->post('me/feed', $data);

            $share = true;

        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            // When Graph returns an error
            echo 'Graph returned an error: ' . $e->getMessage();
            session_destroy();
            // redirecting user back to app login page
            header("Location: http://www.tweety.midnightjabber.com");
            exit;
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            // When validation fails or other local issues
            echo 'Facebook SDK returned an error: ' . $e->getMessage();
            exit;
        }

        $response = array();
        $response['share'] = $share;

        return json_encode($response);
    } 

    // If facebook is not set
    else {
        // replace your website URL same as added in the developers.facebook.com/apps e.g. if you used http instead of https and you used non-www version or www version of your website then you must add the same here
        $loginUrl = $helper->getLoginUrl('http://tweety.midnightjabber.com/php/facebook-login.php?query=fb_login', $permissions);


        $helper = $fb->getRedirectLoginHelper();

        $response = array();
        $response['share'] = $share;

        return json_encode($response);
    }

}

/**
* This method logs a user into facebook. The facebook identiy is then used to playe the
* game. 
*
* @return response :: JSON Object identifying that if a user is logged in or not
*                     includding more user information if the user is logged in.
*/
function fb_login(){

    // Start a session (cookie)
    session_start();

    // Load facebook classes
    require_once __DIR__ . '/facebook-php-sdk-v4-5.0.0/src/Facebook/autoload.php';

    // Create an instance of facebook
    $fb = new Facebook\Facebook([
        'app_id' => 'app_id_goes_here',
        'app_secret' => 'app_secret_goes_here',
        'default_graph_version' => 'v2.4',
        ]);

    $permissions = ['email']; // optional
    $helper = $fb->getRedirectLoginHelper();

    try {
        if (isset($_SESSION['facebook_access_token'])) {
            $accessToken = $_SESSION['facebook_access_token'];
        } 
        else {

            $accessToken = $helper->getAccessToken();
        }

    } 
    catch(Facebook\Exceptions\FacebookResponseException $e) {

            // When Graph returns an error
        echo 'Graph returned an error: ' . $e->getMessage();
        exit;
    } 
    catch(Facebook\Exceptions\FacebookSDKException $e) {

            // When validation fails or other local issues
        echo 'Facebook SDK returned an error: ' . $e->getMessage();
        exit;
    }


    if (isset($accessToken)) {

        if (isset($_SESSION['facebook_access_token'])) {

            $fb->setDefaultAccessToken($_SESSION['facebook_access_token']);
        } 
        else {
            
            // getting short-lived access token
            $_SESSION['facebook_access_token'] = (string) $accessToken;

            // OAuth 2.0 client handler
            $oAuth2Client = $fb->getOAuth2Client();

            // Exchanges a short-lived access token for a long-lived one
            $longLivedAccessToken = $oAuth2Client->getLongLivedAccessToken($_SESSION['facebook_access_token']);

            $_SESSION['facebook_access_token'] = (string) $longLivedAccessToken;

            // setting default access token to be used in script
            $fb->setDefaultAccessToken($_SESSION['facebook_access_token']);
        }

        // redirect the user back to the same page if it has "code" GET variable
        if (isset($_GET['code'])) {

            header('Location: http://tweety.midnightjabber.com');
        }

        // getting basic info about user
        try {

            $profile_request = $fb->get('/me?fields=name,first_name,last_name,email,gender,link,location,picture');
            $profile = $profile_request->getGraphNode()->asArray();

        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            // When Graph returns an error
            echo 'Graph returned an error: ' . $e->getMessage();
            session_destroy();
            // redirecting user back to app login page
            header("Location: http://www.tweety.midnightjabber.com");
            exit;
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            // When validation fails or other local issues
            echo 'Facebook SDK returned an error: ' . $e->getMessage();
            exit;
        }
        
        $response = array();
        $response['loggedIn'] = true;
        $response['fullname'] = $profile['name'];
        $response['location'] = 'undefined';
        $response['player_id'] = $profile['id'];
        $response['profile_pic'] = 'http://graph.facebook.com/' . $response['player_id'] .'/picture?type=large';
        $response['gender'] = $profile['gender'];
        $response['link'] = $profile['link'];
        $response['social_media'] = "Facebook";
        $response['logout_url'] = "http://tweety.midnightjabber.com/php/facebook-login.php?query=fb_logout";

        // printing $profile array on the screen which holds the basic info about user
        //print_r($profile);

        return json_encode($response, JSON_FORCE_OBJECT);

        // Now you can redirect to another page and use the access token from $_SESSION['facebook_access_token']
    } 

    // If facebook is not set
    else {
        // replace your website URL same as added in the developers.facebook.com/apps e.g. if you used http instead of https and you used non-www version or www version of your website then you must add the same here
        $loginUrl = $helper->getLoginUrl('http://tweety.midnightjabber.com/php/facebook-login.php?query=fb_login', $permissions);

        $response = array();
        $helper = $fb->getRedirectLoginHelper();
        $response['loggedIn'] = false;
        $response['loginUrl'] = $loginUrl;

        return json_encode($response);
    }


}


/**
* This methout logs the player out of Facebook and disconnects the Facebook account
* from Tweety.
*/
function fb_logout(){

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

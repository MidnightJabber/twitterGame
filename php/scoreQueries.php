<?php
/// This file is related to all the functionality regarding accessing and storing scores
/// for the Tweety games. This file is responsible of storing game data into the DB after every game 
/// (an AJAX request must bne made). This file is also responsible for providing usage data and some
/// other analytical data. This file also logs some data about scoring upon command.
///
/// Author: Vishrut Reddi
/// MidnightJabber (c) 2015 - 2016 

//To connect to the Database
include('connection.php');

// To Log Data
include('logger.php');

// Get the query/function that needs to be performed
$query = $_REQUEST['query'];

switch((string)$query){

	case "record_score":

		// Giving every player details 'NULL' for default values
		$player_name = $score = $time_remaining = $num_correct = $num_incorrect = $profile_pic = $ip_address =  NULL;

		$player_name = $_REQUEST['name'];
		$time_remaining = $_REQUEST['timeRemaining'];
		$score = $_REQUEST['score'];
		$num_correct = $_REQUEST['correct'];
		$num_incorrect = $_REQUEST['incorrect'];
		$profile_pic = $_REQUEST['profile_pic'];
		$ip_address = $_REQUEST['ipAddress'];

		// Checking if the parameters received from AJAX call have been set or not
		if(isset($player_name) == false){
			logWarning('gameSelectionLogs.html', 'Player\'s Name was not set from the AJAX Call.');
			$player_name = 'anonymous';
		}
		
		if(isset($ip_address) == false){
			logWarning('gameSelectionLogs.html', 'The IP Address for the recent Game was not set from the AJAX Call.');
			$ip_address = 'X_X';
		}
		
		if(isset($profile_pic) == false){
			logWarning('gameSelectionLogs.html', 'The Profile Pic for the Player in the Recent Game was not set by the AJAX call.');
			$profile_pic = 'www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-foxy-fox.png';
		}
			
		if(!isset($score) || !isset($num_correct) || !isset($num_incorrect) || !isset($time_remaining)){
			$error_mssg = 'Some crucial data was <b>not set</b> in the AJAX call, therefore the score storage for the recent game did not take place. The following showing TRUE values were not set in the AJAX Call:<br>Score : ' . !isset($score) . '<br> Num_Correct : ' . !isset($num_correct)  . '<br> Num_Incorrect : ' . !isset($num_incorrect) . '<br> Time-Remaining : ' . !isset($time_remaining);
			logError('gameSelectionLogs.html', $error_mssg);
			break;		
		}

		storeGameInfo($player_name, $time_remaining, $score, $num_correct, $num_incorrect, $profile_pic, $ip_address);
		break;

	// If $query is not set
	default:
		break;
}

/**
* This method looking at how many game data was logged in terms of score, player name, num_correct
* num_incorrect etc finds out how many total games were played.
*
* @return noOfGamesPlayed : Number of Tweety Games Played
*/
function getTotalGamesPlayed(){
	
	// Get connection to the DB
	$link = getConnection();

	$query = "SELECT Count(*) FROM Scores;";
	$res = mysqli_query($link,$query);

	$noOfGamesPlayed = 0;

	while($row = $res->fetch_array()){

		$noOfGamesPlayed = $row[0];
	}

	return $noOfGamesPlayed;
}


/**
* This method is used to store the ionformation about a Tweety game session. This information can later be
* used to find the top 10 scores, find game info about a particular session etc.
*
* @param player_name :: Name of the Player
* @param time_remaining :: Total time remaining in seconds
* @param score :: Total score at the end of the game
* @param num_correct :: Number of correct pairs selected
* @param num_incorrect :: Number of incorrect pairs selected
* @param profile_pic :: Profile Picture link of the player
* @param ip_address :: IP Address of the player
*/
function storeGameInfo($player_name, $time_remaining, $score, $num_correct, $num_incorrect, $profile_pic, $ip_address){

	// Get connection to the DB
	$link = getConnection();

	// Generate global unique Game ID 
	$guid = getGUID();

	// Insert Game Data for the Player
	$query = "INSERT INTO Scores(Game_ID, Player, Score, Time_Remaining, Num_Correct, Num_Incorrect, Profile_Pic, IP_Address) VALUES('".(string)$guid."',".$player_name.", ".$score.", ".$time_remaining.", ".$num_correct.", ".$num_incorrect.", ".$profile_pic.", '".$ip_address."'');";
	
	$res = mysqli_query($link,$query);

	$affectedRows = mysqli_affected_rows($link);
	
	// log information based on result
	if($affectedRows == 1){

		if($player_name == NULL)
			$player_name = 'NOT_SPECIFIED';

		logSuccess('gameSelectionLogs.html', 'Player <b>' . $player_name . '</b>\'s game data has been stored. Game ID: <b>' . $guid . '</b>.');
	}
	else{

		if($player_name == NULL)
			$player_name = 'NOT_SPECIFIED';

		logError('gameSelectionLogs.html', 'Unable to store game data for Player <b>' . $player_name . '</b>. <b> ERROR: </b>' . (string)mysqli_error($link));
	}
	
}


/**
* This method provides information for the given number of top scorers for 'Tweety' to display in the High-Scores.
* The top scorers are the All-Time top scorers.
*
* @param numOfResults :: The number of top scorers needed.
* 
* @return topScorers :: JSON Object with ranks and other info of the top scorers
*/
//TODO --> Implement Later
function getTopScorers($numOfResults){

}


function getGUID(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }else{
        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = chr(123)// "{"
            .substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12)
            .chr(125);// "}"
        return $uuid;
    }
}

?>
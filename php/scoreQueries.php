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


ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);


// Get the query/function that needs to be performed
$query = $_REQUEST['query'];


switch((string)$query){

	// Record the score and other game details for a single tweety game in the DB
	case "record_score":


		// Get connection to the DB
		$link = getConnection();
		

		$player_name = $_POST['name'];
		$time_remaining = $_POST['timeRemaining'];
		$score = $_POST['score'];
		$num_correct = $_POST['correct'];
		$num_incorrect = $_POST['incorrect'];
		$profile_pic = $_POST['profile_pic'];
		$ip_address = $_POST['ipAddress'];

		$player_id = $_POST['player_id'];
		$social_media = $_POST['social_media'];
		$gender = $_POST['gender'];
		$profile_link = $_POST['profile_link'];
		$location = $_POST['location'];
		

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

		if(isset($player_id) == false){
			logWarning('gameSelectionLogs.html', 'The Player ID for the Player in the Recent Game was not set by the AJAX call.');
			$player_id = null;
		}

		if(isset($gender) == false){
			logWarning('gameSelectionLogs.html', 'The Gender for the Player in the Recent Game was not set by the AJAX call.');
			$gender = "undefined";
		}

		if(isset($social_media) == false){
			logWarning('gameSelectionLogs.html', 'The Social Media for the Player in the Recent Game was not set by the AJAX call.');
			$social_media = "-";
		}

		if(isset($profile_link) == false){
			logWarning('gameSelectionLogs.html', 'The Profile Link for the Player in the Recent Game was not set by the AJAX call.');
			$profile_link = "";
		}

		if(isset($location) == false){
			logWarning('gameSelectionLogs.html', 'The Location for the Player in the Recent Game was not set by the AJAX call.');
			$location = "undefined";
		}

		if(!isset($score) || !isset($num_correct) || !isset($num_incorrect) || !isset($time_remaining)){
			$error_mssg = 'Some crucial data was <b>not set</b> in the AJAX call, therefore the score storage for the recent game did not take place. The following showing TRUE values were not set in the AJAX Call:<br>Score : ' . !isset($score) . '<br> Num_Correct : ' . !isset($num_correct)	. '<br> Num_Incorrect : ' . !isset($num_incorrect) . '<br> Time-Remaining : ' . !isset($time_remaining);
			logError('gameSelectionLogs.html', $error_mssg);
			break;
		}

		storeGameInfo($player_name, $time_remaining, $score, $num_correct, $num_incorrect, $profile_pic, $ip_address, $gender, $player_id, $social_media, $profile_link, $location, $link);
		
		
		echo json_encode("Success");
		break;

	// Retrieve the number of complete Tweety games played
	case "get_game_count":

		// Get connection to the DB
		$link = getConnection();

		$totalGames = getTotalGamesPlayed();
		echo $totalGames;
		break;

		// If $query is not set

	// Retreive the high scoring players of Tweety
	case "get_top_players":

		// Get connection to the DB
		$link = getConnection();

		$numOfPlayers = $_REQUEST['count'];

		// Checking if the parameters received from AJAX call have been set or not
		if(isset($numOfPlayers) == false || $numOfPlayers > 20){
			logWarning('gameSelectionLogs.html', '<b>Count Parameter</p> was not set for retreiver top scoring players or the count was higher than the allowed value (i.e 20). Defaulted to: 10.');
			$numOfPlayers = 10;
		}

		echo getTopScorers($numOfPlayers, $link);
		break;

	// Get Tweety Stats for the homepage
	case "get_stats":

		// Get connection to the DB
		$link = getConnection();

		echo json_encode(getTweetyStats($link));

		break;


	default:
		break;
}


/**
* This method provides Stats about a particular player. The following stats are generated:
* 1) Player Name
* 2) Personal Best Score
* 3) Number of Games Played
* 4) Last Game Played (Score, Time Remaining, Num Correct, Num Incorrect)
* 5) Total Correct
* 6) Total Incorrect
*
* @param $connectionLink :: Connection to the DB 
* @param player_id :: Unique Identifier (Generated by Facebook or Twitter) to identify a player
* 
* @return stats : Associative Array containg information of the player stats
*/
function getPlayerStats($link, $player_id){

	// Create Query+
	$query = "SELECT * FROM Scores WHERE Player_ID = " . $player_id . ";";

	// Execute the query
	$res = mysqli_query($link,$query);

	$stats = array();

	$noOfGamesPlayed = 0;
	$totalCorrect = 0;
	$totalIncorrect = 0;
	$lastGame = array();
	$bestScore = 0;
	$playerName = "";
	$rank = 0;

	$lastGame['score'] = 0;
	$lastGame['time_remaining'] = 0;
	$lastGame['num_correct'] = 0;
	$lastGame['num_incorrect'] = 0;

	while($row = $res->fetch_array()){

		// Increase Game Count
		$noOfGamesPlayed = $noOfGamesPlayed + 1;

		// Increase Total Correct Count
		$totalCorrect = $totalCorrect + $row['Num_Correct'];

		// Increase Total Incorrect Count 
		$totalIncorrect = $totalIncorrect + $row['Num_Incorrect'];

		// Get the personal best score for the player
		if($row['Score'] > $bestScore){

			$bestScore = $row['Score'];
		}

		$playerName = $row['Player'];

		// Store Last Game Info
		// (note: We overwrite so that the last iteration is what we get)
		$lastGame['score'] = $row['Score'];
		$lastGame['time_remaining'] = $row['Time_Remaining'];
		$lastGame['num_correct'] = $row['Num_Correct'];
		$lastGame['num_incorrect'] = $row['Num_Incorrect'];


	}

	$query = "SELECT Player_ID, max(Score) as bestScore FROM Scores GROUP BY Player_ID ORDER BY bestScore DESC;";
	// Execute the query
	$res = mysqli_query($link,$query);

	$player_exists = false;

	while($row = $res->fetch_array()){

		// Decrease Rank
		$rank = $rank + 1;

		// Found the Player, Get out of the loop
		if($player_id == $row['Player_ID']){

			$player_exists = true;
			break;
		}

	}

	if($player_exists == false){

		$rank = 0;
	}


	$stats['player_name'] = $playerName;
	$stats['best_score'] = $bestScore;
	$stats['last_game'] = $lastGame;
	$stats['total_correct'] = $totalCorrect;
	$stats['total_incorrect'] = $totalIncorrect;
	$stats['games_played'] = $noOfGamesPlayed;
	$stats['rank'] = $rank;

	return $stats;

}


/**
* This method provides the STATS for the hompage of Tweety. The stats that are showcased
* include:
* 1) Total Games Played
* 2) Highest Score
* 3) Fastest Time i.e Quickest Game Played
*
* @param $connectionLink :: Connection to the DB 
* 
* @return stats : Associative Array containg information of the homepage stats
*/
function getTweetyStats($connectionLink){

	// Get connection to the DB
	$link = $connectionLink;

	// Aquire Total Games Played
	$totalGames = getTotalGamesPlayed($link);

	// Aquire Highest Score
	$topScorer = json_decode(getTopScorers(1, $link), true);
	$highestScore = $topScorer["1"]["score"];

	// Aquire Fastest Time 
	$fastScorer = json_decode(getFastestPlayers(1, $link), true);
	$fastestTime = 120 - intval($fastScorer["1"]["timeRemaining"]);

	$stats["0"] = intval($totalGames); 		// STAT #0 -> Total Games
	$stats["1"] = intval($highestScore); 	// STAT #1 -> Highest Score
	$stats["2"] = $fastestTime;  	// STAT #2 -> Fastest Time

	return $stats;
}


/**
* This method looking at how many game data was logged in terms of score, player name, num_correct
* num_incorrect etc finds out how many total games were played.
*
* @param $connectionLink :: Connection to the DB 
* 
* @return noOfGamesPlayed : Number of Tweety Games Played
*/
function getTotalGamesPlayed($connectionLink){

	// Get connection to the DB
	$link = $connectionLink;

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
* @param connectionLink :: Connection to the DB
* @param gender :: gender of the player
* @param player_id :: Unique player ID given by the social media
* @param social_media :: Social Media used to represent the player
* @param player_link :: Social Media page of the player
* @param location :: location of user mentioned in the social media
*/
function storeGameInfo($player_name, $time_remaining, $score, $num_correct, $num_incorrect, $profile_pic, $ip_address, $gender, $player_id, $social_media, $profile_link, $location, $connectionLink){

	// Get connection to the DB
	$link = $connectionLink;

	// Generate global unique Game ID
	$guid = getGUID();

	// Insert Game Data for the Player
	$query = "INSERT INTO Scores(Game_ID, Player, Score, Time_Remaining, Num_Correct, Num_Incorrect, Profile_Pic, IP_Address, Player_ID, Gender, Profile_Link, Location, Social_Media) VALUES('".(string)$guid."','".$player_name."', ".$score.", ".$time_remaining.", ".$num_correct.", ".$num_incorrect.", '".$profile_pic."', '".$ip_address."', '".$player_id."', '".$gender."', '".$profile_link."', '".$location."', '".$social_media."');";

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
* This method provides information for the given number of fast game solving players for 'Tweety'.
* The fast players are the All-Time fastest players.
*
* @param numOfResults :: The number of fast players needed.
* @param connectionLink :: Connection to the DB
*
* @return topScorers :: JSON Object with ranks and other info of the fast players
*/
function getFastestPlayers($numOfResults, $connectionLink){

	// Get connection to the DB
	$link = $connectionLink;

	$query = "SELECT * FROM Scores ORDER BY Time_Remaining DESC LIMIT " . (string)$numOfResults . ";";

	$res = mysqli_query($link,$query);

	// Associative Array to store the top players info
	$topPlayers = array();

	$rank = 1;

	while($row = $res->fetch_array()){

		// Add Players Details to the Associative Array
		$topPlayers[$rank]['playerName']= $row['Player'];
		$topPlayers[$rank]['playerID'] = $row['Player_ID'];
		$topPlayers[$rank]['profilePic'] = $row['Profile_Pic'];
		$topPlayers[$rank]['score'] = $row['Score'];
		$topPlayers[$rank]['numCorrect'] = $row['Num_Correct'];
		$topPlayers[$rank]['numIncorrect'] = $row['Num_Incorrect'];
		$topPlayers[$rank]['timeRemaining'] = $row['Time_Remaining'];

		// Increase the rank
		$rank = $rank + 1;
	}

	return json_encode($topPlayers);
}


/**
* This method provides information for the given number of top scorers for 'Tweety' to display in the High-Scores.
* The top scorers are the All-Time top scorers.
*
* @param numOfResults :: The number of top scorers needed.
* @param connectionLink :: Connection to the DB
*
* @return topScorers :: JSON Object with ranks and other info of the top scorers
*/
function getTopScorers($numOfResults, $connectionLink){

	// Get connection to the DB
	$link = $connectionLink;

	$query = "SELECT * FROM Scores ORDER BY Score DESC LIMIT " . (string)$numOfResults . ";";

	$res = mysqli_query($link,$query);

	// Associative Array to store the top players info
	$topPlayers = array();

	$rank = 1;

	while($row = $res->fetch_array()){

		// Add Players Details to the Associative Array
		$topPlayers[$rank]['playerName']= $row['Player'];
		$topPlayers[$rank]['playerID'] = $row['Player_ID'];
		$topPlayers[$rank]['profilePic'] = $row['Profile_Pic'];
		$topPlayers[$rank]['score'] = $row['Score'];
		$topPlayers[$rank]['numCorrect'] = $row['Num_Correct'];
		$topPlayers[$rank]['numIncorrect'] = $row['Num_Incorrect'];
		$topPlayers[$rank]['timeRemaining'] = $row['Time_Remaining'];

		// Increase the rank
		$rank = $rank + 1;
	}

	return json_encode($topPlayers);
}


/**
* This function based on the current time and date creates a unique GUID. This GUID is used to represent
* a single complete Tweety game. This method first checks for the inbuild php GUID generation method
* called com_create_guid(). If that function does not exist then this function creates the GUID.
*
* @return uuid :: GUID for the game
*/
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
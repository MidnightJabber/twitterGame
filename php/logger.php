<?php
/// This file creates logging function. Logging data is spread through 2 locations.
/// A simple log file is appended whenever something is logged. Also an 'alive' HTML
/// log webpage is also available at: www.tweety.midnightjabber.com/php/tweetylogs.html
///
/// NOTE: If the file-name provided to logging methods does not exist, it is ok.
///       The functionality provided in this file will automatically create the file and 
///       then log the data.
///
/// Main Log File: tweetylogs.txt
/// Error Log: error.txt
/// Success Log: success.txt
/// Warning Log: warning.txt
/// Info Log: info.txt
///
/// Author: Vishrut Reddi
/// MidnightJabber (c) 2015 - 2016 


/**
* This method is used for logging information. The new log messages will be added to the live
* online logs and a local text copy.
*
* @param filename :: Name of the file
* @param mssg :: Info message to log
*/
function logInfo($filename, $mssg){

	$time = new DateTime(null, new DateTimeZone('America/Chicago')); //Central
	$time = $time->format('Y-m-d H:i:s');    // MySQL datetime format

	$input = $time . " [INFO] : " . $mssg . "\n";
	$htmlInput = "<p class=\"info\"><b>" . $time . "<font color=\"blue\"> [INFO]</font></b><br>" . $mssg . "</p>";

	$fileArray = explode('.', $filename);
	if(strtolower(array_pop($fileArray)) == "html"){

		$htmlInput = "<p class=\"info\"><b>" . $time . "<font color=\"blue\"> [INFO]</font></b><br>" . $mssg . "</p>";
		
		// append in html file
		file_put_contents($filename, $htmlInput, FILE_APPEND);
	}
	else{
		// append in text file
		file_put_contents($filename, $input, FILE_APPEND);
	}
}


/**
* This method is used for logging errors. The new log messages will be added to the live
* online logs and a local text copy.
*
* @param filename :: Name of the file
* @param mssg :: error message to log
*/
function logError($filename, $mssg){

	$time = new DateTime(null, new DateTimeZone('America/Chicago')); //Central
	$time = $time->format('Y-m-d H:i:s');    // MySQL datetime format

	$input = $time . " [ERROR] : " . $mssg . "\n";
	$htmlInput = "<p class=\"error\"><b>" . $time . "<font color=\"red\"> [ERROR]</font></b><br>" . $mssg . "</p>";

	$fileArray = explode('.', $filename);
	if(strtolower(array_pop($fileArray)) == "html"){

		$htmlInput = "<p class=\"error\"><b>" . $time . "<font color=\"red\"> [ERROR]</font></b><br>" . $mssg . "</p>";
		
		// append in html file
		file_put_contents($filename, $htmlInput, FILE_APPEND);
	}
	else{
		// append in text file
		file_put_contents($filename, $input, FILE_APPEND);
	}
}


/**
* This method is used for logging success. The new log messages will be added to the live
* online logs and a local text copy.
*
* @param filename :: Name of the file
* @param mssg :: success message to log
*/
function logSuccess($filename, $mssg){

	$time = new DateTime(null, new DateTimeZone('America/Chicago')); //Central
	$time = $time->format('Y-m-d H:i:s');    // MySQL datetime format

	$input = $time . " [SUCCESS] : " . $mssg . "\n";
	$htmlInput = "<p class=\"success\"><b>" . $time . "<font color=\"green\"> [SUCCESS]</font></b><br>" . $mssg . "</p>";

	$fileArray = explode('.', $filename);
	if(strtolower(array_pop($fileArray)) == "html"){

		$htmlInput = "<p class=\"success\"><b>" . $time . "<font color=\"green\"> [SUCCESS]</font></b><br>" . $mssg . "</p>";
		
		// append in html file
		file_put_contents($filename, $htmlInput, FILE_APPEND);
	}
	else{
		// append in text file
		file_put_contents($filename, $input, FILE_APPEND);
	}
}


/**
* This method is used for logging warnings. The new log messages will be added to the live
* online logs and a local text copy.
*
* @param filename :: Name of the file
* @param mssg :: warning message to log
*/
function logWarning($filename, $mssg){

	$time = new DateTime(null, new DateTimeZone('America/Chicago')); //Central
	$time = $time->format('Y-m-d H:i:s');    // MySQL datetime format

	$input = $time . " [WARNING] : " . $mssg . "\n";
	$htmlInput = "<p class=\"warning\"><b>" . $time . "<font color=\"orange\"> [WARNING]</font></b><br>" . $mssg . "</p>";
	
	$fileArray = explode('.', $filename);
	if(strtolower(array_pop($fileArray)) == "html"){

		$htmlInput = "<p class=\"warning\"><b>" . $time . "<font color=\"orange\"> [WARNING]</font></b><br>" . $mssg . "</p>";
		
		// append in html file
		file_put_contents($filename, $htmlInput, FILE_APPEND);
	}
	else{
		// append in text file
		file_put_contents($filename, $input, FILE_APPEND);
	}
}


/**
* This method deletes the given file.
*
* @param filename :: Name of the file
*/
function clearLogs($filename){

	unlink($filename);
}

?>
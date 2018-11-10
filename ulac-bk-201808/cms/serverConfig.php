<?php
	$servername = "68.178.143.15"; //72.167.233.38
	$username = "ULAC123"; // ULAC123
	$password = "Luluvirus@2016"; // Luluvirus@2016
	$dbname = "ULAC123"; // ULAC123

	$con = mysqli_connect($servername,$username,$password,$dbname);
	
	//header('Content-Type: text/html;charset=utf-8');
	
	// Check connection
	if (mysqli_connect_errno()){
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	if( function_exists('mysqli_set_charset') ){
	    mysqli_set_charset($con, 'utf8');
	}else{
	    mysqli_query("SET NAMES 'utf8'", $con);
	}
?>
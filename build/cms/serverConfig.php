<?php
	$servername = "localhost"; //72.167.233.38
	$username = "root"; // ULAC123
	$password = "root"; // Luluvirus@2016
	$dbname = "ULAC"; // ULAC123

	$con = mysqli_connect($servername,$username,$password,$dbname);
	
	header('Content-Type: text/html;charset=utf-8');
	
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
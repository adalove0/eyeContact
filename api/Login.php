<?php

	$inData = getRequestInfo();
	$servername = "localhost";
	$database = "eyeContacts";
	$username = "creator";
	$password = "plsdonthackmebro2";
	
	$unameID = 0;
	
	$conn = new mysqli($servername, $username, $password, $database);
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT unameID FROM login_info where username='" . $inData["username"] . "' and password='" . $inData["password"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$unameID = $row["unameID"];
			
			returnWithInfo($unameID);
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"unameID":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"unameID":' . $unameID . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
<?php
	$inData = getRequestInfo();
	$servername = "localhost";
	$database = "eyeContacts";
	$username = "creator";
	$password = "plsdonthackmebro2";
	
	$inputUname = $inData["username"];
	$inputPassword = $inData["password"];
	$inputFirstName = $inData["first_name"]
	$inputLastName = $inData["last_name"]

	$conn = new mysqli($servername, $username, $password, $database);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "INSERT INTO login_info (username,password,userFirstName,userLastName) 
		VALUES ('" . $inputUname . "','" . $inputPassword . 
		"','" . $inputFirstName . "','" . $inputLastName . "')";
		if( !$result = $conn->query($sql) )
		{
			returnWithError( $conn->error );
		}
		else 
		{
			returnWithInfo();
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
	
	function returnWithInfo()
	{
		$retValue = '{"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>

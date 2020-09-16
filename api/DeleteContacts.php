<?php
	$inData = getRequestInfo();
	$servername = "localhost";
	$database = "eyeContacts";
	$username = "creator";
	$password = "plsdonthackmebro2";
	
	$contactNumber = $inData["contactNumber"];

	$conn = new mysqli($servername, $username, $password, $database);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "DELETE FROM contacts where contactNumber=" . $contactNumber;
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

	function returnWithInfo()
	{
		$retValue = '{"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>

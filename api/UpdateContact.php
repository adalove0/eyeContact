<?php
	$inData = getRequestInfo();
	$servername = "localhost";
	$database = "eyeContacts";
	$username = "creator";
	$password = "plsdonthackmebro2";
	
	$newFirstName = $inData["contactFirstName"];
	$newLastName = $inData["contactLastName"];
	$newEmail = $inData["email"];
	$newPhoneNumber = $inData["phoneNumber"];
	$contactNumber = $inData["contactNumber"];
	
	$conn = new mysqli($servername, $username, $password, $database);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		# UPDATE contacts SET contactFirstName=name, contactLastName=name, email=email, phoneNumber=phoneNumber WHERE contactNumber=contactNumber;
		$sql = "UPDATE contacts SET contactFirstName='" . $newFirstName . "', contactLastName='" . $newLastName . "',email='" 
		. $newEmail . "', phoneNumber='" . $newPhoneNumber . "' WHERE contactNumber=" . $contactNumber;
		if( $result = $conn->query($sql) != TRUE )
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
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo()
	{
		$retValue = '{"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
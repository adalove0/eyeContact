<?php
	$inData = getRequestInfo();
	$servername = "localhost";
	$database = "eyeContacts";
	$username = "creator";
	$password = "plsdonthackmebro2";
	
	$unameID = $inData["unameID"];
	$contactFirstName = $inData["contactFirstName"];
	$contactLastName = $inData["contactLastName"];
	$email = $inData["email"];
	$phoneNumber = $inData["phoneNumber"];
	$dateCreated = getdate();

	$conn = new mysqli($servername, $username, $password, $database);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "INSERT INTO contacts (unameID,contactFirstName,contactLastName,email,
		phoneNumber,dateCreated) VALUES ('" . $unameID . "','" . $contactFirstName . "','" 
		. $contactLastName . "','" . $email . "','" . $phoneNumber . "','" . $dateCreated["year"] 
		. "-" . $dateCreated[mon] . "-" . $dateCreated[mday] . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}	
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
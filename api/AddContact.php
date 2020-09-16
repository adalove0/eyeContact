<?php
	$inData = getRequestInfo();
	
	$unameID = $inData["unameID"];
	$contactFirstName = $inData["contactFirstName"];
	$contactLastName = $inData["contactLastName"];
	$email = $inData["email"];
	$phoneNumber = $inData["phoneNumber"];
	$dateCreated = getdate();

	$conn = new mysqli();
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "INSERT INTO contacts (unameID,contactFirstName,contactLastName,email,
		phoneNumber,dateCreated) VALUES ('" . $unameID . "','" . $contactFirstName . "','" 
		. $contactLastName . "','" . $email . "','" . $phoneNumber . "','" . $dateCreated["year"] 
		. "-" . $dateCreated["mon"] . "-" . $dateCreated["mday"] . "')";
		if( !$result = $conn->query($sql) )
		{
			returnWithError( $conn->error );
		}
		returnWithInfo();
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

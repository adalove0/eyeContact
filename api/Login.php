<?php
	$inData = getRequestInfo();
	$servername = "localhost";
	$database = "eyeContacts";
	$username = "creator";
	$password = "plsdonthackmebro2";
	
	$unameID = 0;
	$userFirstName = "";
	$userLastName = "";
	
	$inputUname = $inData["username"];
	$inputPassword = $inData["password"];
	
	$conn = new mysqli($servername, $username, $password, $database);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT (unameID, userFirstName, userLastName) FROM login_info where username='" . $inputUname . "' and password='" . $inputPassword . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$unameID = $row["unameID"];
			$userFirstName = $row["userFirstName"];
			$userLastName = $row["userLastName"];
			
			returnWithInfo( $unameID, $userFirstName, $userLastName );
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
		$retValue = '{"unameID":0,"userFirstName":"","userLastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $unameID, $userFirstName, $userLastName )
	{
		$retValue = '{"unameID":"' . $unameID . '","userFirstName":"' . $userFirstName . '","userLastName":"' . $userLastName '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
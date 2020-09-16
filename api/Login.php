<?php
	$inData = getRequestInfo();
	
	$unameID = 0;
	$inputUname = $inData["username"];
	$inputPassword = $inData["password"];
	
	$conn = new mysqli_connect();
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT unameID FROM login_info where username='" . $inputUname . "' and password='" . $inputPassword . "'";
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
	
	function returnWithInfo( $unameID )
	{
		$retValue = '{"unameID":"' . $unameID . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
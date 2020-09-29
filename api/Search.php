<?php
	$inData = getRequestInfo();
	$servername = "localhost";
	$database = "eyeContacts";
	$username = "creator";
	$password = "plsdonthackmebro2";
	
	$searchResults = '{"contacts":[{';
	$numContacts = 0;
	
	$conn = new mysqli($servername, $username, $password, $database);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT * from contacts where (contactFirstName LIKE '%" . $inData["searchString"] 
		. "%' or contactLastName LIKE '%" . $inData["searchString"] . "%') AND unameID=" . $inData["unameID"];
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc())
			{
				if( $numContacts > 0 )
				{
					$searchResults .= ",{";
				}
				$searchResults .= '"contactNumber":"' . $row["contactNumber"] .'","contactFirstName":"' .
				$row["contactFirstName"] .'","contactLastName":"' . $row["contactLastName"] . '","email":"' .
				$row["email"] .'","phoneNumber":"' . $row["phoneNumber"] . '","dateCreated":"' . $row["dateCreated"]
				. '"}';
				$numContacts++;
			}
			$searchResults .= '],';
			returnWithInfo( $searchResults, $numContacts );
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
		$retValue = '{"contacts":[{}],"numContacts":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults, $numContacts )
	{
		$retValue = $searchResults . '"numContacts":' . $numContacts .',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>

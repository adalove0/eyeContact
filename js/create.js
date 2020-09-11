function create(){
	var url = 'http://plsgiveusana.me/api/Register.php';
	var username = document.getElementById("Username").value;
	var password = document.getElementById("Password").value;
	var verifiedPassword = document.getElementById("verify").value;
	if(username == "" || password == "" || verifiedPassword == "")
	{
		alert("Enter all required fields");
		return;
	}
	if(password != verifiedPassword)
	{
		alert("Passwords don't match");
		return;
	}
	var data= '{"username" : "' + username +'", "password" : "' + password + '"}';
	var xhr = new XMLHttpRequest();
	xhr.open("POST",url,false);
    xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
    try
    {
        xhr.send(data);
        var response = JSON.parse(xhr.responseText); 
        var error = response["error"];
        if(error == "")
        {
        	alert("User created");
        	return;
        }
        else
        	alert("Error");
    }
    catch(error){
    	alert(error.message);
    }
}

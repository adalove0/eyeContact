function login(){
	var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);
	var username =  $("#Username").val();
	var password =  $("#Password").val();
	if(username == "" || password == "")
		alert("Please enter all required fields");
	else
	{
		$ajax({
			type: "POST",
			url: "api/login.php",
			data: {
				username: username,
				passcode : password,
				success: function(textResponse){
					if(textResponse.indexOf("error") != -1)
						alert("username or password is wrong");
					else
						alert("Login successfull");
				},

			},
		});
	}
}

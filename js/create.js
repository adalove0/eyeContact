function create(){
    var username =  $("#Username").val();
	var password =  $("#Password").val();
	var verifiedPassword =  $("#verify").val();
	if(username == "" || password == "" || verifiedPassword == "")
		alert("Please enter all required fields");
	else
	{
		$ajax({
			type: "POST",
			url: "api/Register.php.",
			data: {
				userName: username,
				passWord: password,
				VerifiedPassword : verifiedPassword,
			},
			success: function(textResponse){
				if(textResponse.error!= "")
					alert("username or password is wrong");
				else
					alert("Login successfull");
				},
		});
	}
}

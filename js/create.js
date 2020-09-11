$("#ajaxform").submit(function(e){
$(document).ready(function(){
    $("#createUserButton").on("click",function(){
        username: $("#Username").val(),
        password: $("#Password").val(),
        verifiedPassword: $("#verify").val(),
        if(password != verifiedPassword)
            alert("Passwords don't match");
        $.ajax({
            type: "POST",
            url: "Register.php",
            data: {
                username: username,
                password: password,
                verifiedPassword: verifiedPassword,
                success: function(data){
          
                    else
                    {
                        if(data.error == "")
                           alert("Username already used");
                        else
                            alert("Account created");
                    }
                       
                },
            },
        });
      });
    });
  });

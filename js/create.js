$("#ajaxform").submit(function(e){
$(document).ready(function(){
    $("#createUserButton").on("click",function(){
        $.ajax({
            type: "POST",
            url: "Register.php",
            data: {
                username: $("#Username").val(),
                password: $("#Password").val(),
                verifiedPassword: $("#verify").val(),
                success: function(data){
                    if(password != verifiedPassword)
                        alert("Passwords don't match");
                    else
                    {
                        if(data == "error")
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

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
                        $("#msg1").html("Passwords don't match");
                    else
                    {
                        if(data == "error")
                            $("#msg1").html("Username already used");
                        else
                            $("msg1").html("Account created");
                    }
                       
                },
            },
        });
      });
    });
  });

unction addContact(){
	var url = 'http://plsgiveusana.me/api/AddContact.php';
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var data = '{"contactFirstName" :"'+username+'", "contactLastName" :"' +password + '" ,"email" :"'+email+'", "phoneNumber" :"' +phone + '"}';
	let xhr = new XMLHttpRequest();
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
    try
    {
        xhr.send(data);
        var response = JSON.parse(xhr.responseText);
        var error = response["error"];
        if(error == "")
        {
            alert("Error");
            return;
        }
        else
        {
            alert("Correct!!")
        }
    }
    catch(err)
    {
        alert(err.message);
    }
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value ="";
    document.getElementById("email").value = "";
 }

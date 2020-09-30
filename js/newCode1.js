
var userID = 0;
    function create(){
        var url = 'http://plsgiveusana.me/api/Register.php';
        var username = document.getElementById("Username").value;
        var password = document.getElementById("Password").value;
        var verifiedPassword = document.getElementById("verify").value;
        if(username == "" || password == "" || verifiedPassword == "")
        {
            document.getElementById("create-text").innerHTML = "Enter all required fields";
            return;
        }
        if(password != verifiedPassword)
        {
            document.getElementById("create-text").innerHTML =  "Passwords don't match";
            return;
        }
        password = MD5(password);
        var data= '{"username" : "' + username +'", "password" : "' + password + '"}';
	document.getElementById("create-text").innerHTML = "";
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
                document.getElementById("Username").value = "";
                document.getElementById("Password").value = "";
                document.getElementById("verify").value = "";
                window.location.href = "LandingPage.html";
            }
            else
                document.getElementById("create-text").innerHTML = "Username already exists";
        }
        catch(err){
            console.log(err.message);
        }
    }
    function login()
    {
        userID = 0;
        var url = 'http://plsgiveusana.me/api/Login.php';
        var username = document.getElementById("Login").value;
        var password = MD5(document.getElementById("Password").value);
        var data = '{"username" :"'+username+'", "password" :"' +password + '"}';
	 if(username == "" || password == "")
         {
            document.getElementById("login-text").innerHTML = "Enter all required fields";
            return;
         }
	 document.getElementById("login-text").innerHTML = "";
        let xhr = new XMLHttpRequest();
        xhr.open("POST",url,false);
        xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
        try
        {
            xhr.send(data);
            var response = JSON.parse(xhr.responseText);
            userID = response["unameID"];
            if( userID == 0)
            {
               document.getElementById("login-text").innerHTML = "Username/Password combination is wrong";
                return;
            }
            else
            {
                firstName = response["firstName"];
                lastName = response["lastName"];
                saveCookie();
                window.location.href = "viewContacts.html";
            }
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    function saveCookie()
    {
        var minutes = 20;
        var date = new Date();
        date.setTime(date.getTime()+(minutes*60*1000));
        document.cookie = "id="+ userID + ";expires=" + date.toUTCString();
    }
    function readCookie()
    {
     
        userID = -1;
        var text = document.cookie;
        var dataArrays = text.split(";");
        var currData = dataArrays[0].split("=");
        if(currData[0] == "id")
            userID = parseInt(currData[1].trim());
    }

    function logout()
    {
        userID = 0;
	document.cookie = "id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "LandingPage.html";

	
    }
    function addContact()
    {
        var url = 'http://plsgiveusana.me/api/AddContact.php';
        var ContactFirstName = document.getElementById("firstName").value;
        var ContactLastName = document.getElementById("lastName").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        readCookie();
        var jsonPayload = '{"unameID" : ' + userID + ', "contactFirstName" : "' + ContactFirstName+ '", "contactLastName" : "' + ContactLastName +'", "email" : "'+email+'", "phoneNumber" : "' +phone + '"}';
        let xhr = new XMLHttpRequest();
        xhr.open("POST",url,true);
        xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
         try
        {
            xhr.onreadystatechange = function() 
            {
                if (this.readyState == 4 && this.status == 200) 
                {
                    window.location.href = "viewContacts.html";
                }
            };
            xhr.send( jsonPayload );
        }
        catch(err)
        {
            console.log(err.message);
        }

     }
function read()
{
	//readCookie();
        document.getElementById("search-btn").addEventListener("click",function(){
		searchContact();
	});
        document.getElementById("clickableAwesomeFont").addEventListener("click",function(){
            window.location.href = "addContact.html";
        });
        var url = 'http://plsgiveusana.me/api/GetContacts.php';
	readCookie();
        var data= '{"unameID" : ' + userID + '}';
        var xhr = new XMLHttpRequest();
        xhr.open("POST",url,true);
        xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
        try
         {
             xhr.onreadystatechange = function()
             {
                 if(this.readyState == 4 && this.status == 200)
                 {
                     var jsonData = JSON.parse(xhr.responseText);
                     displayContacts(jsonData);
                 }
             };
         xhr.send(data);
        }
          catch(err)
        {
            console.log(err.message);
        }
}

function displayContacts(jsonData)
{
    var table = document.createElement("tbody");
    table.id = "display-table";
    document.getElementById("displayTable").appendChild(table);
    var num = jsonData["numContacts"];
    var contactsList = jsonData["contacts"];
    var d2, d1, d3;
    for(var i = 0 ; i < num; i++)
    {
         var response = contactsList[i];
         var row = table.insertRow();
         var contactnumero = i;
         var cellName = row.insertCell();
         cellName.classList.add("accordion");
         cellName.style.cursor = "pointer";
         cellName.id = i;
         cellName.style.width = "780px";
         cellName.innerHTML = response.contactFirstName+" "+ response.contactLastName;
	 cellName.classList.add("Name");
         var cellEdit = row.insertCell();
         cellEdit.id = i;
	 cellEdit.classList.add("Edit");
         cellEdit.style.cursor = "pointer";
         cellEdit.innerHTML = '<i style="font-size:24px" class="fa">&#xf044;</i>';
         var cellDelete = row.insertCell();
         cellDelete.id = response.contactNumber;
	 cellDelete.classList.add("Delete");
         cellDelete.style.cursor = "pointer";
         cellDelete.innerHTML = '<i style="font-size:24px" class="fa">&#xf014;</i>';
         cellEdit.addEventListener("click", function() {
	        var contactID = jsonData.contacts[this.id].contactNumber;
                document.getElementById("fname1").value = jsonData.contacts[this.id].contactFirstName;
	    	document.getElementById("lname1").value = jsonData.contacts[this.id].contactLastName;
	    	document.getElementById("phone1").value = jsonData.contacts[this.id].phoneNumber;
	    	document.getElementById("email1").value = jsonData.contacts[this.id].email;
	    	document.getElementById("edit-container").style.display = "block";
            	document.getElementById("container").style.display = "none";
	    	document.getElementById("edit-btn").addEventListener("click",function(){
		editContact(contactID);
		document.getElementById("edit-container").style.display = "none";
                document.getElementById("big-container").style.display = "block";
	        document.getElementById("fnameVal").value = document.getElementById("fname1").value;
	        document.getElementById("lnameVal").value = document.getElementById("lname1").value;
	        document.getElementById("phoneVal").value = document.getElementById("phone1").value;
	        document.getElementById("emailVal").value = document.getElementById("email1").value;
	
            });
	});
	 cellDelete.addEventListener("click", function() {
            if (window.confirm("Are you sure you want to delete this contact?"))
            	deleteContact(this.id);
         });


	  document.getElementById("back-btn").addEventListener("click",function(){
	     window.location.href = "viewContacts.html";
        });
        cellName.addEventListener("click", function(){
	    var firstName = jsonData.contacts[this.id].contactFirstName;
	    var lastName = jsonData.contacts[this.id].contactLastName;
	    var phoneNumber = jsonData.contacts[this.id].phoneNumber;
	    var contactID = jsonData.contacts[this.id].contactNumber;
	    var email =  jsonData.contacts[this.id].email;
	    document.getElementById("fnameVal").value = firstName;
	    document.getElementById("lnameVal").value = lastName;
	    document.getElementById("phoneVal").value = phoneNumber;
	    document.getElementById("emailVal").value = email;
	    document.getElementById("container").style.display = "none";
            document.getElementById("big-container").style.display = "block";
	    document.getElementById("edit-button1").addEventListener("click", function(){
	    	document.getElementById("fname1").value = document.getElementById("fnameVal").value;
	    	document.getElementById("lname1").value = document.getElementById("lnameVal").value;
	    	document.getElementById("phone1").value = document.getElementById("phoneVal").value;
	    	document.getElementById("email1").value = document.getElementById("emailVal").value;
	    	document.getElementById("edit-container").style.display = "block";
            	document.getElementById("big-container").style.display = "none";
	    	document.getElementById("edit-btn").addEventListener("click",function(){
		editContact(contactID);
		document.getElementById("edit-container").style.display = "none";
                document.getElementById("big-container").style.display = "block";
	        document.getElementById("fnameVal").value = document.getElementById("fname1").value;
	        document.getElementById("lnameVal").value = document.getElementById("lname1").value;
	        document.getElementById("phoneVal").value = document.getElementById("phone1").value;
	        document.getElementById("emailVal").value = document.getElementById("email1").value;
	   });
        });
      });
	document.getElementById("edit-button1").addEventListener("click",function(){
	     document.getElementById("edit-container").style.display = "block";
             document.getElementById("big-container").style.display = "none";		
	});
	document.getElementById("back-button1").addEventListener("click",function(){
	    // document.getElementById("container").style.display = "block";
            //document.getElementById("big-container").style.display = "none";
		window.location.href = "viewContacts.html";
	});	
     }
}

function editContact(index)
{
  var newFname = document.getElementById("fname1").value;
  var newLname = document.getElementById("lname1").value;
  var newPhone = document.getElementById("phone1").value;
  var newEmail = document.getElementById("email1").value;
  readCookie();
  var url = "http://plsgiveusana.me/api/UpdateContact.php";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
      //$sql = "UPDATE contacts SET contactFirstName='" . $newFirstName . "', contactLastName='" . $newLastName . "',email='"
    //. $newEmail . "', phoneNumber='" . $newPhoneNumber . "' WHERE contactNumber=" . $contactNumber;
  xhr.setRequestHeader("contactFirstName", "application/json; charset=UTF-8");
  var jsonPayload = '{"contactFirstName" : "' + newFname + '",  "contactLastName" : "' + newLname + '", "email" : "' + newEmail  + '",  "phoneNumber" : "' + newPhone +'", "contactNumber" : ' + index +'}';
  try
  {
    xhr.send(jsonPayload);
    }
    catch(err)
    {
      console.log(err.message);
    }
}
function deleteContact(index)
{
  readCookie();
  var jsonPayload = '{"contactNumber" : ' + index +'}';
  var url = "http://plsgiveusana.me/api/DeleteContacts.php";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
      //$sql = "UPDATE contacts SET contactFirstName='" . $newFirstName . "', contactLastName='" . $newLastName . "',email='"
    //. $newEmail . "', phoneNumber='" . $newPhoneNumber . "' WHERE contactNumber=" . $contactNumber;
  xhr.setRequestHeader("contactFirstName", "application/json; charset=UTF-8");
  try
  {
    xhr.onreadystatechange = function()
    {
      if(this.readyState == 4 && this.status == 200)
      {
        var table = document.getElementById("display-table");
        window.location.href = "viewContacts.html";
      }
    };
      xhr.send(jsonPayload);
    }
  catch(err)
  {
    console.log(err.message);
  }

}
function searchContact()
{
  var searchUrl = "http://plsgiveusana.me/api/Search.php";
  var searchVal = document.getElementById("search-target").value;
  var xhr = new XMLHttpRequest();
  xhr.open("post", searchUrl, true);
  xhr.onload = () => {
  if (xhr.status === 200) {
    var json = JSON.parse(xhr.responseText);
   //alert("Found Contacts");
    var clearTbody = document.getElementById("display-table");
    document.getElementById("displayTable").innerHTML = "";
    displayContacts(json);
  //alert(searchResult);
  }
};
  var payload = JSON.stringify({ unameID: userID, searchString: searchVal});
  xhr.send(payload);
}




var userID = 0;
var valueToSrch = "";
 console.log(userID);
    function create(){
        var url = 'http://plsgiveusana.me/api/Register.php';
        var username = document.getElementById("Username").value;
        var password = document.getElementById("Password").value;
        var verifiedPassword = document.getElementById("verify").value;
        if(username == "" || password == "" || verifiedPassword == "")
        {
            doucment.getElementById("create-text").innerHTML = "Enter all required fields";
            return;
        }
        if(password != verifiedPassword)
        {
            doucment.getElementById("create-text").innerHTML =  "Passwords don't match";
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
        console.log(userID);
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
            console.log(userID);
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


        /*console.log(data);
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("phone").value ="";
        document.getElementById("email").value = "";*/
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
        console.log(userID);
         var data= '{"unameID" : ' + userID + '}';
         console.log(data);
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
                     console.log(jsonData);
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
        var cellDelete = row.insertCell();
        cellDelete.id = response.contactNumber;
        cellDelete.style.cursor = "pointer";
        cellDelete.innerHTML = '<i style="font-size:24px" class="fa">&#xf014;</i>';
        cellDelete.addEventListener("click", function() {
            deleteContact(this.id);
         });
        //var contentDiv1 = document.createElement("div");
        //var newLine = document.createElement("br");
        //contentDiv1.id = "contact" + response.contactNumber;
        //contentDiv1.style.display = "none";
        /*var infotable = document.createElement("table");
	infotable.id = "contact-view";
        var fnamerow = infotable.insertRow();
        var fnameTitle = fnamerow.insertCell();
        fnameTitle.innerHTML = "First name: ";
        var fnameContent = fnamerow.insertCell();
        fnameContent.innerHTML = response.contactFirstName;
        var lnamerow = infotable.insertRow();
        var lnameTitle = lnamerow.insertCell();
        lnameTitle.innerHTML = "Last name: ";
        var lnameContent = lnamerow.insertCell();
        lnameContent.innerHTML = response.contactLastName;
        var emailrow = infotable.insertRow();
        var emailTitle = emailrow.insertCell();
        emailTitle.innerHTML = "Email: ";
        var emailContent = emailrow.insertCell();
        emailContent.innerHTML = response.email;
        var phonerow = infotable.insertRow();
        var phoneTitle = phonerow.insertCell();
        phoneTitle.innerHTML = "Phone Number: ";
        var phoneContent = phonerow.insertCell();
        phoneContent.innerHTML = response.phoneNumber;
        contentDiv1.appendChild(infotable);
        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";*/
        //editButton.id = i;
	/*editButton.classList.add("edit-button");
        contentDiv1.appendChild(editButton);
	contentDiv1.classList.add("view-table");
        var backButton1 = document.createElement("button");
        backButton1.innerHTML = "Back";
	backButton1.id = "back-btn1";
        contentDiv1.appendChild(backButton1);
        var backButton = document.createElement("button");
        backButton.innerHTML = "Back";
        var doneButton = document.createElement("button");
        doneButton.innerHTML = "Edit";
        doneButton.id = response.contactNumber;
        doneButton.addEventListener("click", function(){
         var editID = "form" + this.id;
          d2 = document.getElementById("contact"+this.id);
          d3  = document.getElementById(editID);
           edit(this.id);
           d2.style.display = "block";
           d3.style.display = "none";
        });*/
        //contentDiv2.appendChild(backButton);
        //contentDiv2.appendChild(doneButton);
       // contentDiv2.style.display = "none";
        //document.getElementById("edit-container").appendChild(contentDiv2);
        //document.getElementById("big-container").appendChild(contentDiv1);
        /*editButton.addEventListener("click", function(){
	    var contactID = jsonData.contacts[this.id].contactNumber;
	    document.getElementById("fname1").value = jsonData.contacts[this.id].contactFirstName;
	    document.getElementById("lname1").value = jsonData.contacts[this.id].contactLastName;
	    document.getElementById("phone1").value = jsonData.contacts[this.id].phoneNumber;
	    document.getElementById("email1").value = jsonData.contacts[this.id].email;
	    document.getElementById("edit-container").style.display = "block";
            document.getElementById("big-container").style.display = "none";
	    document.getElementById("edit-btn").addEventListener("click",function(){
		editContact(contactID);
		});
        });*/
	document.getElementById("back-btn").addEventListener("click",function(){
	    document.getElementById("edit-container").style.display = "none";
            document.getElementById("big-container").style.display = "block";
        });
        cellName.addEventListener("click", function(){
	    document.getElementById("fnameVal").value = jsonData.contacts[this.id].contactFirstName;
	    document.getElementById("lnameVal").value = jsonData.contacts[this.id].contactLastName;
	    document.getElementById("phoneVal").value = jsonData.contacts[this.id].phoneNumber;
	    document.getElementById("emailVal").value = jsonData.contacts[this.id].email;
	    document.getElementById("container").style.display = "none";
            document.getElementById("big-container").style.display = "block";
	    document.getElementById("edit-button1").addEventListener("click", function(){
	    	var contactID = jsonData.contacts[this.id].contactNumber;
	    	document.getElementById("fname1").value = jsonData.contacts[this.id].contactFirstName;
	    	document.getElementById("lname1").value = jsonData.contacts[this.id].contactLastName;
	    	document.getElementById("phone1").value = jsonData.contacts[this.id].phoneNumber;
	    	document.getElementById("email1").value = jsonData.contacts[this.id].email;
	    	document.getElementById("edit-container").style.display = "block";
            	document.getElementById("big-container").style.display = "none";
	    	document.getElementById("edit-btn").addEventListener("click",function(){
		editContact(contactID);
	   });
        })
	    
            /*var cellID = "contact"+this.id;
            d1 = document.getElementById("contactView");
            d2 = document.getElementById(cellID);
            if(d2.style.display == "none")
            {
		document.getElementById("contactView").style.display = "none";
                d2.style.display = "block";
		document.getElementById("big-container").style.display = "block";
             }*/
        });
	document.getElementById("edit-button1").addEventListener("click",function(){
	     document.getElementById("edit-container").style.display = "block";
            document.getElementById("big-container").style.display = "none";
	});
	document.getElementById("back-button1").addEventListener("click",function(){
	     document.getElementById("container").style.display = "block";
            document.getElementById("big-container").style.display = "none";
	});	
        /*backButton.addEventListener("click",function(){
		document.getElementById("big-container").style.display = "none";
		document.getElementById("edit-container").style.display = "block";
        });
        backButton1.addEventListener("click",function(){
           window.location.href = "viewContacts.html";
        });*/
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
    console.log(JSON.parse(xhr.responseText));
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
	
/*function displaySearch(jsonData)
{
    document.getElementById("container").style.display = "none";
    document.getElementById("searchView").style.display = "block";
    document.getElementById("back-search").style.display = "block";
    var table = document.createElement("tbody");
    table.id = "search-table";
    document.getElementById("searchTable").appendChild(table);
    var buttonBack = document.createElement("button");
    buttonBack.innerHTML = "Back";
    buttonBack.addEventListener("click", function() {
      window.location.href = "viewContacts.html";
    });
    var num = jsonData["numResults"];
    var contactsList = jsonData["results"];
    var d2, d1, d3;
    for(var i = 0 ; i < num; i++)
    {
         var response = contactsList[i];
         var row = table.insertRow();
         var cellName = row.insertCell();
         cellName.classList.add("accordion");
         cellName.style.cursor = "pointer";
         cellName.id = i;
         cellName.style.width = "780px";
         cellName.innerHTML = response.contactFirstName+" "+ response.contactLastName;
        var cellDelete = row.insertCell();
        cellDelete.id = response.contactNumber;
        cellDelete.style.cursor = "pointer";
        cellDelete.innerHTML = '<i style="font-size:24px" class="fa">&#xf014;</i>';
        cellDelete.addEventListener("click", function() {
            deleteContact(this.id);
         });
        var contentDiv1 = document.createElement("div");
        var newLine = document.createElement("br");
        contentDiv1.id = "contact" + response.contactNumber;
        contentDiv1.style.display = "none";
        var infotable = document.createElement("table");
	infotable.id = "contact-view";
        var fnamerow = infotable.insertRow();
        var fnameTitle = fnamerow.insertCell();
        fnameTitle.innerHTML = "First name: ";
        var fnameContent = fnamerow.insertCell();
        fnameContent.innerHTML = response.contactFirstName;
        var lnamerow = infotable.insertRow();
        var lnameTitle = lnamerow.insertCell();
        lnameTitle.innerHTML = "Last name: ";
        var lnameContent = lnamerow.insertCell();
        lnameContent.innerHTML = response.contactLastName;
        var emailrow = infotable.insertRow();
        var emailTitle = emailrow.insertCell();
        emailTitle.innerHTML = "Phone number: ";
        var emailContent = emailrow.insertCell();
        emailContent.innerHTML = response.email;
        var phonerow = infotable.insertRow();
        var phoneTitle = phonerow.insertCell();
        phoneTitle.innerHTML = "Email: ";
        var phoneContent = phonerow.insertCell();
        phoneContent.innerHTML = response.phoneNumber;
        contentDiv1.appendChild(infotable);
        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.id = response.contactNumber;
        contentDiv1.appendChild(editButton);
        var backButton1 = document.createElement("button");
        backButton1.innerHTML = "Button2";
        contentDiv1.appendChild(backButton1);
        var contentDiv2 = document.createElement("div");
        contentDiv2.id = "form" + response.contactNumber;
        var addForm = document.createElement("form");
        var fnamelabel = document.createElement("label");
        fnamelabel.setAttribute("for","fnamelabel");
        fnamelabel.htmlFor = "text";
        fnamelabel.innerHTML = "First name: ";
        var fnameinput = document.createElement("input");
        fnameinput.id = "editFname"+response.contactNumber;
        fnameinput.value = response.contactFirstName;
        addForm.appendChild(fnamelabel);
        addForm.appendChild(newLine);
        addForm.appendChild(fnameinput);
        addForm.appendChild(newLine.cloneNode());
        var lnamelabel = document.createElement("label");
        lnamelabel.setAttribute("for","lnamelabel");
        lnamelabel.htmlFor = "text";
        lnamelabel.innerHTML = "Last name: ";
        var lnameinput = document.createElement("input");
        lnameinput.value = response.contactLastName;
        lnameinput.id = "editLname"+response.contactNumber;
        addForm.appendChild(lnamelabel);
        addForm.appendChild(newLine.cloneNode());
        addForm.appendChild(lnameinput);
        addForm.appendChild(newLine.cloneNode());
        var phonelabel = document.createElement("label");
        phonelabel.setAttribute("for","phonelabel");
        phonelabel.htmlFor = "text";
        phonelabel.innerHTML = "Phone: ";
        var phoneinput = document.createElement("input");
        phoneinput.id = "editPhone"+response.contactNumber;
        phoneinput.value = response.phoneNumber;
        addForm.appendChild(phonelabel);
        addForm.appendChild(newLine.cloneNode());
        addForm.appendChild(phoneinput);
        addForm.appendChild(newLine.cloneNode());
        var emailabel = document.createElement("label");
        emailabel.setAttribute("for","emailabel");
        emailabel.htmlFor = "text";
        emailabel.innerHTML = "Email: ";
        var emailinput = document.createElement("input");
        emailinput.id = "editEmail"+response.contactNumber;
        emailinput.value = response.email;
        addForm.appendChild(emailabel);
        addForm.appendChild(newLine.cloneNode());
        addForm.appendChild(emailinput);
        addForm.appendChild(newLine.cloneNode());
        contentDiv2.appendChild(addForm);
        contentDiv1.classList.add("new-form");
        var backButton = document.createElement("button");
        backButton.innerHTML = "Back";
        var doneButton = document.createElement("button");
        doneButton.innerHTML = "Done";
        doneButton.id = response.contactNumber;;
        doneButton.addEventListener("click", function(){
         var editID = "form" + this.id;
	  d1 = document.getElementById("search-table");
          d2 = document.getElementById("contact"+this.id);
          d3  = document.getElementById(editID);
           edit(this.id);
           d2.style.display = "block";
           d3.style.display = "none";
        });
        contentDiv2.appendChild(backButton);
        contentDiv2.appendChild(doneButton);
        contentDiv2.style.display = "none";
        document.getElementById("edit-container1").appendChild(contentDiv2);
        document.getElementById("big-container1").appendChild(contentDiv1);
        editButton.addEventListener("click", function(){
            var editID = "form" + this.id;
            d2 = document.getElementById("contact"+this.id);
            d3  = document.getElementById(editID);
            if(d3.style.display == "none")
            {
                d2.style.display = "none";
                d3.style.display = "block";
            }
        });
	   cellName.addEventListener("click", function(){
            var cellID = "contact"+this.id;
            d1 = document.getElementById("contactView");
            d2 = document.getElementById(cellID);
            if(d2.style.display == "none")
            {
                d1.style.display = "none";
                d2.style.display = "block";
             }
        });


        backButton.addEventListener("click",function(){
                d3.style.display = "none";
                d2.style.display = "block";
        });
        backButton1.addEventListener("click",function(){
           d2.style.display = "none";
            d1.style.display = "block";
        });
    } 
}*/



var userID = 0;
 console.log(userID);
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
        password = MD5(password);
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
                document.getElementById("Username").value = "";
                document.getElementById("Password").value = "";
                document.getElementById("verify").value = "";
                window.location.href = "LandingPage.html";
            }
            else
                alert("Error");
        }
        catch(err){
            alert(err.message);
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
                alert("Username/Password combination is wrong");
                return;
            }
            else
            {
                firstName = response["firstName"];
                lastName = response["lastName"];
                saveCookie();
                window.location.href = "test-page.html";
            }
        }
        catch(err)
        {
            alert(err.message);
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
        console.log(userID);

        if( userID < 0 )
        {
            console.log(userID);
        }
       
            console.log(userID);//display name
 
    }

    function logout()
    {
        userID = 0;
        document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
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
        var data = '{"unameID" : "' + userID + '", "contactFirstName" : "' + ContactFirstName+ '", "contactLastName" : "' + ContactLastName +'", "email" : "'+email+'", "phoneNumber" : "' +phone + '"}';
        alert(data);
        let xhr = new XMLHttpRequest();
        xhr.open("POST",url,true);
        xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
        try
        {
            xhr.send(data);
            saveCookie();
            window.location.href = "test-page.html";
        }
        catch(err)
        {
            alert(err.message);
        }
        /*console.log(data);
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("phone").value ="";
        document.getElementById("email").value = "";*/
     }
function read()
{
        document.getElementById("search-button").addEventListener("click",function(){
            search();
        });
        document.getElementById("clickableAwesomeFont").addEventListener("click",function(){
            window.location.href = "addContact.html";
        });
        var url = 'http://plsgiveusana.me/api/GetContacts.php';
        readCookie();
        console.log(userID);
         var data= '{"unameID" : "' + userID + '"}';
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
            alert(err.message);
        }
}

function displayContacts(jsonData)
{
    table = document.createElement("tbody");
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
         cellName.id = response.contactNumber;
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
        var image = document.createElement("img");
        image.src= "images/user.jpg";
        image.id = "user-img";
        contentDiv1.style.display = "none";
        var infotable = document.createElement("table");
        var fnamerow = infotable.insertRow();
        var lnamerow = infotable.insertRow();
        var emailrow = infotable.insertRow();
        var phonerow = infotable.insertRow();
        var fname = document.createElement("p");
        var lname = document.createElement("p");
        var emailPhoneP = document.createElement("p");
        var phone = document.createElement("p");
        fname.id = "show-fname"+response.contactNumber;
        emailPhoneP.id = "show-email"+response.contactNumber;
        phone.id = "show-phone"+response.contactNumber;
        lname.id = "show-lname"+response.contactNumber;
        fname.innerHTML = "First name: "+'&nbsp &nbsp &nbsp &nbsp' + response.contactFirstName;
        fnamerow.appendChild(fname);
        lname.innerHTML = "Last name: "+'&nbsp &nbsp &nbsp &nbsp &nbsp' + response.contactLastName;
        lnamerow.appendChild(lname);
        emailPhoneP.innerHTML = "Email: "+'&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp' + response.email;
        emailrow.appendChild(emailPhoneP);
        phone.innerHTML = "Phone "+'&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp' + response.phoneNumber;
        phonerow.appendChild(phone);
        contentDiv1.appendChild(image);
        contentDiv1.appendChild(infotable);
        var editButton = document.createElement("button");
        editButton.innerHTML = '<i class="material-icons" style="font-size:36px">mode_edit</i>';
        editButton.id = response.contactNumber;
        contentDiv1.appendChild(editButton);
        var backButton1 = document.createElement("button");
        backButton1.innerHTML = "Button2";
        contentDiv1.appendChild(backButton1);
        var contentDiv2 = document.createElement("div");
        contentDiv2.id = "form" + response.contactNumber;
        contentDiv2.appendChild(image);
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
        backButton.innerHTML = "Button1";
        var doneButton = document.createElement("button");
        doneButton.innerHTML = "DONE";
        doneButton.id = response.contactNumber;;
        doneButton.addEventListener("click", function(){
         alert("Yes");
         var editID = "form" + this.id;
          d2 = document.getElementById("contact"+this.id);
          d3  = document.getElementById(editID);
           edit(this.id);
           d2.style.display = "block";
           d3.style.display = "none";
        });
        contentDiv2.appendChild(backButton);
        contentDiv2.appendChild(doneButton);
        contentDiv2.style.display = "none";
        document.getElementById("edit-container").appendChild(contentDiv2);
        document.getElementById("big-container").appendChild(contentDiv1);
        editButton.addEventListener("click", function(){
            alert("Hello");
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
}

function edit(index)
{
  var newFname = document.getElementById("editFname"+index).value;
  var newLname = document.getElementById("editLname"+index).value;
  var newPhone = document.getElementById("editEmail"+index).value;
  var newEmail = document.getElementById("editPhone"+index).value;
  readCookie();
  var url = "http://plsgiveusana.me/api/UpdateContact.php";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
      //$sql = "UPDATE contacts SET contactFirstName='" . $newFirstName . "', contactLastName='" . $newLastName . "',email='"
    //. $newEmail . "', phoneNumber='" . $newPhoneNumber . "' WHERE contactNumber=" . $contactNumber;
  xhr.setRequestHeader("contactFirstName", "application/json; charset=UTF-8");
  var jsonPayload = '{"contactFirstName" : "' + newFname + '",  "contactLastName" : "' + newLname + '", "email" : "' + newEmail  + '",  "phoneNumber" : "' + newPhone +'", "contactNumber" : "' + index +'"}';
  alert(jsonPayload);
  try
  {
    xhr.send(jsonPayload);
    document.getElementById("show-fname"+index).innerHTML = "First name: "+'&nbsp &nbsp &nbsp &nbsp' + newFname;
    document.getElementById("show-lname"+index).innerHTML = "Last name: "+'&nbsp &nbsp &nbsp &nbsp &nbsp' + newLname;
    document.getElementById("show-phone"+index).innerHTML = "Phone "+'&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp'+ newPhone;
    document.getElementById("show-email"+index).innerHTML = "Email: "+'&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp' + newEmail;
    }
    catch(err)
    {
      alert(err.message);
    }
}
function deleteContact(index)
{
  readCookie();
  var jsonPayload = '{"contactNumber" : "' + index +'"}';
  alert(jsonPayload);
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
        alert("YEEEES");
        window.location.href = "test-page.html";
      }
    };
      xhr.send(jsonPayload);
    }
  catch(err)
  {
    alert(err.message);
  }

}
function search()
{
  alert("YES");
  var searchTarget = document.getElementById("search-target").value;
  readCookie();
  var payload = '{"searchString" : "' + searchTarget +'", "unameID" : "' + userID + '"}';
  alert("PAYLOAD: "+ payload);
  var url = 'http://plsgiveusana.me/api/Search.php';
  let xhr = new XMLHttpRequest();
  xhr.open("POST",url,true);
  xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
  try
   {
            xhr.send(payload);
	    var jsonObject = JSON.parse(xhr.responseText);
	    alert(jsonObject);
	    alert("HERE");
            saveCookie();
    }
    catch(err)
    {
       alert(err.message);
    }
}

function login()
{
    var id = 0;
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
        id = response["unameID"];
        if( id == 0)
        {
            alert("Username/Password combination is wrong");
            return;
        }
        else
        {
            alert("Correct!!");
            window.location.href = "../contactListPage.html";
        }
    }
    catch(err)
    {
        alert(err.message);
    }
    document.getElementById("Login").value = "";
    document.getElementById("Password").value = "";
}

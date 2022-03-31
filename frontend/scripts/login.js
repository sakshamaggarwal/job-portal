function myfunction(){

    var element = document.getElementById("txtuser").value;
    if (element!=null){
    var base ='http://127.0.0.1:5000/userExists/'
    axios.get(base+element)
    .then((response) => {
            var result = response.data;
            if (result=='True'){
                 createCookie('uci_netid',element);
                 alert("Welcome");
                 window.location.href="profile.html";
            }
            else{
                alert("New user - registration required");
                window.location.href="UDetails.html";
            }

});
}
else{
 window.location.href="login.html";
}
}


function createCookie(cookieName,cookieValue)
        {
          document.cookie = cookieName + "=" + cookieValue + ";"

          console.log(readCookie('uci_netid'))
        }

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

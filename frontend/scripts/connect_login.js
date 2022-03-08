function myfunction(){

    var element = document.getElementById("txtuser").value;
    var base ='http://127.0.0.1:5000/userExists/'
    axios.get(base+element)
    .then((response) => {
            var result = response.data;
            if (result=='True'){
                 window.location.href="profile.html";
            }
            else{
                window.location.href="form.html";
            }


});
}

function checkCookie()
        {
          var element = document.getElementById("txtuser").value;
          if( element === "" ) {
            window.location.href="login.html";
          }
          else
          {
            createCookie("uci_netid", element);
          }
       }

function createCookie(cookieName,cookieValue)
        {
          document.cookie = cookieName + "=" + cookieValue + ";"
           myfunction();
          /*console.log(document.cookie);
          console.log(readCookie('uci_netid'))*/
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


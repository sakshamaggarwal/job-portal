
function myfunction(){
    var element = document.getElementById("txtuser").value;
    var base ='http://127.0.0.1:5000/userExists/'
    axios.get(base+element)
    .then((response) => {
            var result = response.data;
            if (result=='True'){
                 window.location.href="profile/"+ element+".html";
            }
            else{
                window.location.href="form.html";
            }


});
}

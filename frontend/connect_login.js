
function myfunction(){
    var element = document.getElementById("txtuser").value;
    var base ='http://127.0.0.1:5000/profile/'
    axios.get(base+element)
    .then((response) => {
            var result = response.data;
            window.location.href="profile.html"

        }).catch(function (error) {
    if (error.response.status==500) {

      console.log(error.response.status);
      window.location.href="form.html"
    }

});

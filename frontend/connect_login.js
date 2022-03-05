
function myfunction(){
    var element = document.getElementById("txtuser").value;
    var base ='http://127.0.0.1:5000/profile/'
    axios.get(base+element).then(
    (response) => {
            var result = response.data;
            var num= Object.keys(result).length;
            if (num>0){
                window.location.href="dashboard"
            } else{
                window.location.href="registration"
            }
        },

    );
}

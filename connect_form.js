
function myfunction(){
    var element_id = document.getElementById("uci_netid").value;
	var element_fname = document.getElementById("first_name").value;
	var element_lname = document.getElementById("last_name").value;
	var element_g = document.getElementById("gender").value;
	var element_d = document.getElementById("disability").value;
	var element_year = document.getElementById("year").value;
    var base ='http://127.0.0.1:5000/profile/'
    axios.get(base+element_id&&element_d&&element_fname&&element_lname&&element_g&&element_year).then(
    (response) => {
            var result = response.data;
            var num= Object.keys(result).length;
            if (num>0){
                window.location.href="profile.html"
            } else{
                window.location.href="form.html"
            }
        },

    );
}

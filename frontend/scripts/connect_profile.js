
const axios = require('axios');

function postProfile(){
    var element_id = document.getElementById("uci_netid").value;
	var element_fname = document.getElementById("first_name").value;
	var element_lname = document.getElementById("last_name").value;
	var element_g = document.getElementById("gender").value;
	var element_d = document.getElementById("disability").value;
	var element_year = document.getElementById("year").value;
	var element_major = document.getElementById("major").value;
	var element_v = document.getElementById("veteran").value;
	var element_we = document.getElementById("work").value;
	var element_skills = document.getElementById("skills").value;
	var element_wa = document.getElementById("work_auth").value;
	var element_race = document.getElementById("race_dropdown_container").value;
	
    let payload = { uci_netid : element_id, first_name : element_fname, last_name: element_lname, major: element_major, year : element_year, gender : element_g, sex : element_g, disability : element_d,
                     veteran : element_v, work_ex : element_we, skills : element_skills, work_auth : element_wa, grad_date : element_year, ethinicity : element_race};
	let res = await axios.post('http://127.0.0.1:5000/profile/', payload);
	
	let data = res.data;
    console.log(data);
}
postProfile();



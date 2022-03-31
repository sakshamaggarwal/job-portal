
function postProfile(){

  var element_id = document.getElementById("uci_id").value;
	var element_fname = document.getElementById("first_name").value;
	var element_lname = document.getElementById("last_name").value;
	var element_g = document.getElementById("gender").value;
	var element_d = document.getElementById("disability").value;
	var element_year = document.getElementById("year").value;
	var element_cyear = document.getElementById("cyear").value;
	var element_major = document.getElementById("major").value;
	var element_v = document.getElementById("veteran").value;
	var element_we = document.getElementById("work").value;
	var element_skills = document.getElementById("skills").value;
	var element_race = document.getElementById("race_dropdown_container").value;
	var element_work_sponsorship=document.getElementById("work_sponsorship").value;

  let payload = { uci_netid : element_id,
            first_name : element_fname,
            last_name: element_lname,
            major: element_major,
            year : element_cyear,
            graduation_year : element_year,
            gender : element_g,
           // sex : element_g,
            race : element_race,
            disability : element_d,
            veteran : element_v,
            work_experience : element_we,
            skills : element_skills,
            //work_auth : element_wa,
            work_sponsorship : element_work_sponsorship,
        };

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/createProfile",
    data: JSON.stringify(payload),
    contentType: 'application/json',
      success: function(res) {

      alert('Profile created');
      document.cookie = "uci_netid=" + element_id + ";"
      window.location.href="http://localhost:8080/profile.html";
  }
  });

    return false;
}

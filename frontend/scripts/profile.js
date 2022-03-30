var user;

$(document).ready(auth);
alert("Reload");
function formAction()
{

  btn=document.getElementById('editbtn');
  if(btn.innerText=="Edit")
  {
    btn.innerText="Save";
    edit();
  }
  else
  {
    btn.innerText="Edit";
    save();
  }
  return false;
}

function edit()
{
  console.log("edit called");
  document.getElementById('cancelbtn').style.visibility='visible';
  changeReadOnly(false);
}

function save()
{
  //console.log("save called");
  postProfile();

  document.getElementById('cancelbtn').style.visibility='hidden';
  changeReadOnly(true);
}

function postProfile(){

  const axios = require('axios');
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
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/createProfile",
    data: JSON.stringify(payload),
    contentType: 'application/json',
      success: function(res) {

      console.log('Profile saved');

  }
  });
}

function cancel()
{
  fetchProfile(user);

  btn=document.getElementById('editbtn');
  btn.innerText="Edit";
  document.getElementById('cancelbtn').style.visibility='hidden';
  changeReadOnly(true);
}

function changeReadOnly(bool)
{
  cells=document.getElementsByClassName('val');
  for(var i=0;i<cells.length;i++)
  {
    if(cells[i].hasAttribute("readOnly"))
    {
      cells[i].readOnly=bool;
    }
    else {
      cells[i].disabled=bool;
    }
  }
}

function auth(){

  user=readCookie('uci_netid');
  console.log(user);
  if (user===null)
  {
    alert("not logged in");
    window.location.href="login.html";
  }
  else {
    fetchProfile(user);
  }
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

function fetchProfile(user)
{
  $.get( "http://localhost:5000/profile/"+user, function( data, status ) {
    populateTable(JSON.parse(data));
  });
}

function populateTable(data)
{

  //console.log(data);
  document.getElementById("first_name").value=data["first_name"];
  document.getElementById("last_name").value=data['last_name'];
  document.getElementById("gender").value=data['gender'];
  document.getElementById("disability").value=data['disability'];
  document.getElementById("year").value=data['year'];
  document.getElementById("major").value=data['major'];
  document.getElementById("veteran").value=data['veteran'];
  document.getElementById("work").value=data['work_experience'];
  document.getElementById("skills").value=data['skills'];
  document.getElementById("work_auth").value=data['work_sponsorship'];
  document.getElementById("race_dropdown_container").value=data['race'];
  document.getElementById("grad_year").value=data['graduation_year'];
  document.getElementById("profile_name").innerText=data['first_name']+" "+data['last_name'];
  document.getElementById("profile_id").innerText="UCI NetID : "+data['uci_netid'];

}

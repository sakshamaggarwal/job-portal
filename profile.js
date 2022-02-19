function edit()
{
  cells=document.getElementsByClassName('val');
  btn=document.getElementById('editbtn');
  bool="false";

  if(btn.innerText=="Edit")
  {
    btn.innerText="Save";
    bool="true";
    document.getElementById('cancelbtn').style.visibility='visible';
  }
  else {
    document.getElementById('cancelbtn').style.visibility='hidden';
    btn.innerText="Edit";
  }

  for(var i=0;i<cells.length;i++)
  {
    //console.log(cells[i].innerText);
    cells[i].setAttribute("contenteditable", bool);
  }
}

function cancel()
{

}

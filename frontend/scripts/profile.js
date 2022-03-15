function formAction()
{
  //console.log("form submitted");
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
}

function edit()
{
  //console.log("edit called");
  document.getElementById('cancelbtn').style.visibility='visible';
  changeReadOnly(false);
}

function save()
{
  //console.log("save called");

  /*
  add save logic
  */

  document.getElementById('cancelbtn').style.visibility='hidden';
  changeReadOnly(true);
}

function cancel()
{
  /*
  add change logic
  */

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

function edit()
{
  btn=document.getElementById('editbtn');

  if(btn.innerText=="Edit")
  {
    btn.innerText="Save";
    document.getElementById('cancelbtn').style.visibility='visible';
    changeReadOnly(false);
  }
  else {
    document.getElementById('cancelbtn').style.visibility='hidden';
    btn.innerText="Edit";
    changeReadOnly(true);
  }
}

function cancel()
{
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

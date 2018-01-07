document.getElementById('navbut').addEventListener('click', navMenu);

function navMenu() {
  if (document.getElementById('navlink').style.display === 'none') {
    document.getElementById('navlink').style.display = 'block';
  } else {
    document.getElementById('navlink').style.display = 'none';
  }

}

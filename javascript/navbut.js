//adds an event listener for when the menu is clicked
document.getElementById('navbut').addEventListener('click', navMenu);

//when clicked makes it apper if it isn't there, and vice versa
function navMenu() {
  if (document.getElementById('navlink').style.display === 'none') {
    document.getElementById('navlink').style.display = 'block';
  } else {
    document.getElementById('navlink').style.display = 'none';
  }

}

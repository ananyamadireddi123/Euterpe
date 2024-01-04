var navLinks = document.querySelectorAll('header ul li a');
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('mouseover', function() {
    this.style.color ='#000000'; // set the color on hover
  });
  navLinks[i].addEventListener('mouseout', function() {
    this.style.color = '#FFFFFF'; // set the default color on mouseout
  });
}

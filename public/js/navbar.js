// Navbar Active Class Tracker

const pageUrl = window.location.pathname;
const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');


for (var i = 0; i < navbarLinks.length; i++) {

  var link = navbarLinks[i];

  var href = link.getAttribute('href');

  link.classList.remove('active');

  if (pageUrl === href) {
    link.classList.add('active');
  }
}



// Sticky Glass Menu Styles //

const header = document.querySelector("header");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("nav-container-shrink-sm", "nav-container-shrink");
  } else {
    header.classList.remove("nav-container-shrink-sm", "nav-container-shrink");
  }
}

// // Sticky Glass Menu Styles

const header = document.querySelector("header");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add("nav-container-shrink-sm", "nav-container-shrink");
  
  } else {
    header.classList.remove("nav-container-shrink-sm", "nav-container-shrink");
  }

}

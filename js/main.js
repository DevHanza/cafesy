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

// OnScroll Loading Effect //
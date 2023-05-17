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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    console.log(entry);
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('slide-up-show', 'slide-right-show', 'slide-left-show');
      }, 200 * index);
    } else {
      entry.target.classList.remove('slide-up-show', 'slide-right-show', 'slide-left-show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.slide-up-hidden, .slide-right-hidden, .slide-left-hidden');
hiddenElements.forEach((el) => observer.observe(el));



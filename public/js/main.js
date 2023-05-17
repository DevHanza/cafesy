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

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry, index) => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       setTimeout(() => {
//         entry.target.classList.add(
//           "slide-up-show",
//           "slide-right-show",
//           "slide-left-show",
//           "slide-down-show"
//         );
//       }, 200 * index);
//     } else {
//       entry.target.classList.remove(
//         "slide-up-show",
//         "slide-right-show",
//         "slide-left-show",
//         "slide-down-show"
//       );
//     }
//   });
// });

// const hiddenElements = document.querySelectorAll(
//   ".slide-up-hidden, .slide-right-hidden, .slide-left-hidden, .slide-down-hidden"
// );
// hiddenElements.forEach((el) => observer.observe(el));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    console.log(entry);
    if (entry.isIntersecting && !hasAnimationPlayed(entry.target)) {
      setTimeout(() => {
        entry.target.classList.add('slide-up-show', 'slide-right-show', 'slide-left-show');
        entry.target.classList.remove('slide-up-hidden', 'slide-right-hidden', 'slide-left-hidden');
        setAnimationPlayed(entry.target);
      }, 200 * index);
    } else {
      entry.target.classList.remove('slide-up-show', 'slide-right-show', 'slide-left-show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.slide-up-hidden, .slide-right-hidden, .slide-left-hidden');
hiddenElements.forEach((el) => {
  el.classList.add('hidden'); // Add a common class 'hidden' to initially hide the elements
  observer.observe(el);
});

function hasAnimationPlayed(element) {
  return element.getAttribute('data-animation-played') === 'true';
}

function setAnimationPlayed(element) {
  element.setAttribute('data-animation-played', 'true');
}

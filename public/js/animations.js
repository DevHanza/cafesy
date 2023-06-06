
// OnScroll Loading Effect //

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      console.log(entry);
      if (entry.isIntersecting && !hasAnimationPlayed(entry.target)) {
        setTimeout(() => {
          entry.target.classList.add(
            "slide-up-show",
            "slide-right-show",
            "slide-left-show",
            "slide-down-show"
          );
          entry.target.classList.remove(
            "slide-up-hidden",
            "slide-right-hidden",
            "slide-left-hidden",
            "slide-down-hidden"
          );
          setAnimationPlayed(entry.target);
        }, 150 * index);
      } else {
        entry.target.classList.remove(
          "slide-up-show",
          "slide-right-show",
          "slide-left-show",
          "slide-down-show"
        );
      }
    });
  });
  
  const hiddenElements = document.querySelectorAll(
    ".slide-up-hidden, .slide-right-hidden, .slide-left-hidden, .slide-down-hidden"
  );
  hiddenElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });
  
  function hasAnimationPlayed(element) {
    return element.getAttribute("data-animation-played") === "true";
  }
  
  function setAnimationPlayed(element) {
    element.setAttribute("data-animation-played", "true");
  }
  
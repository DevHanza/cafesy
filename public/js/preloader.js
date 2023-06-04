var lottiePreloader = document.getElementById("lottiePreloader");

var preloaderItem = bodymovin.loadAnimation({
  wrapper: lottiePreloader,
  animType: "svg",
  loop: true,
  path: "lottie/loading-icon.json",
});


const preloader = document.getElementById("preloader");

window.addEventListener("load", function () {
  preloader.classList.add("preloader-hidden");
  

  setTimeout(function () {
    preloader.style.display = "none";
    document.body.style.overflow = "auto";
  }, 500);
});

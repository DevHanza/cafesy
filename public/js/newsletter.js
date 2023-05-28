const newsletterAlert = document.getElementById("newsletterAlert");
const appendAlert = (message, type) => {
  const newsletterWrapper = document.createElement("div");
  newsletterWrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  newsletterAlert.append(newsletterWrapper);
};

const alertTrigger = document.getElementById("submitBtn");
if (alertTrigger) {
  alertTrigger.addEventListener("click", () => {
    appendAlert("Nice, you triggered this alert message!", "success");
  });
}

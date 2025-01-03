const express = require("express");
const ejs = require("ejs");

require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const contactRoutes = require("./routes/contactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/menu", (req, res) => {
  res.render("menu");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/contact", contactRoutes);

app.get("/faqs", (req, res) => {
  res.render("faqs");
});

app.use(newsletterRoutes);

app.get("/loading", (req, res) => {
  res.render("partials/preloader", { title: "loading" });
});

app.listen(3000 || process.env.PORT, (req, res) => {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  console.log(
    `${currentTime} | Cafesy is up & Running on http://127.0.0.1:3000/.`
  );
});

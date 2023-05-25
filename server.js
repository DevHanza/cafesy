const express = require("express");
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res)=> {
    res.render("home");
});

app.get("/menu", (req,res) => {
    res.render("menu");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/faq", (req, res) => {
    res.render("faq");
});

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("Server is up & Running on port 3000.")
});
const express = require("express");
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res)=> {
    res.render("index");
});

app.get("/shop", (req,res) => {
    res.render("shop");
});

app.listen(3000, (req, res) => {
    console.log("Server is up & Running on port 3000.")
});
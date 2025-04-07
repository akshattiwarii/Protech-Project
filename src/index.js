const express = require('express');
const app = express();
const path = require("path");
const hbs = require("hbs");

const tempelatePath = path.join(__dirname, "../tempelates");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views",tempelatePath);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000/`);
});

app.get('/', (req, res) => {
  res.render("login");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});
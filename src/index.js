const express = require('express');
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const tempelatePath = path.join(__dirname, "../tempelates");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "hbs");
app.set("views", tempelatePath);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000/`);
});

app.get('/', (req, res) => {
  res.render("login");
});

app.get('/signup', (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role: req.body.role
  }

  await collection.insertMany([data]);
  res.render("home");
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });
    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("Wrong Password");
    }
  } catch {
    res.send("Wrong Details");
  }
});
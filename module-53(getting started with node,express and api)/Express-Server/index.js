const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const users = [
  { id: 1, name: "Shaon", email: "shaon@rana.com" },
  { id: 2, name: "Sajjat", email: "sajjat@rana.com" },
  { id: 3, name: "Rahim", email: "rahim@rana.com" },
];
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const newUsers = req.body;
  console.log(newUsers);
  users.push(newUsers);
  console.log(users);
  res.send(newUsers);
});

app.listen(port, () => {
  console.log("express server is running port " + port);
});

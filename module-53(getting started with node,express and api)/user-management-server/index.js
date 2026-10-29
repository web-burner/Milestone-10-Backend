const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const cors = require("cors");
app.use(cors());
app.use(express.json())
const users = [
  { id: 1, name: "Shaon", email: "shaon@rana.com" },
  { id: 2, name: "Sajjat", email: "sajjat@rana.com" },
  { id: 3, name: "Rahim", email: "rahim@rana.com" },
];

app.get("/", (req, res) => {
  res.send("User management server is running");
});

app.get("/users", (req, res) => {
  res.send(users);
});
app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log("my user management server is running on port ", port);
});

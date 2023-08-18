const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/login", (req, res, next) => {
  res.send(`
    <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username">
      <button type="submit">Login</button>
    </form>
  `);
});

app.get("/", (req, res, next) => {
  fs.readFile("msg.txt", (err, data) => {
    if (err) {
      console.log(err);
      data = "No chat exist.";
    }

    res.send(`
        ${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
            <input type="text" id="message" name="message">
            <input type="hidden" name="username" id="username">
            <br>
            <button type="submit">Send</button>
        </form>
    `);
  });
});

app.post("/", (req, res, next) => {
  fs.writeFile(
    "msg.txt",
    `${req.body.username} : ${req.body.message} `,
    { flag: "a" },
    (err) => (err ? console.log(err) : res.redirect("/"))
  );
});

// app.use((req, res, next) => {
//   res.status(404).send("Page not found..");
// });
app.listen(3000);

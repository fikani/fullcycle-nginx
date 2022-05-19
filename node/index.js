const express = require("express");
const mysql = require("mysql");
const util = require("util");

// node native promisify

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "mysql",
  user: "node",
  password: "node",
  database: "node",
});

connection.connect((error) => {
  const q = util.promisify(connection.query).bind(connection);
  if (error) throw error;

  app.get("/", async (req, res) => {
    try {
      await q(
        "insert into people(name) values(?)",
        makeid(getRandomInt(5, 10))
      );
      const query = await q("select * from people;");
      res.send(`<h1>Full Cycle Rocks!</h1>
                <ul>
                    ${query.map((r) => `<li>${r.name}</li>`).join("")}
                </ul>`);
    } catch (err) {
      res.status(500);
      res.send();
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mariadb from "mariadb";
dotenv.config();

const server = express();

const db = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
});

server.use(cors());
server.use(express.json());

server.get("/api/get/todos", async (req, res) => {
  try {
    const username = req.query.username;

    const connection = await db.getConnection();

    connection
      .query("SELECT todos.ID, todos.title, todos.checked, todos.category, todos.date FROM todos WHERE usernameFK =?", [username])
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });


      connection.release();
  } catch (err) {
    console.log(err);
  }

  
});

server.post("/api/create/todo", async (req, res) => {
  const connection = await db.getConnection();
  const title = req.body.title;
  const category = req.body.category;
  const checked = req.body.checked;
  const date = req.body.date;
  const username = req.body.username;

  connection
    .query(
      "INSERT INTO todos (title, category, checked, date, usernameFK) VALUES (?,?,?,?,?)",
      [title, category, checked, date, username]
    )
    .then((result) => {
      res.sendStatus(result.warningStatus === 0 ? 200 : 500);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

    connection.release();
});

server.post("/login", async (req, res) => {
  const connection = await db.getConnection();
  const username = req.body.username;
  const password = req.body.password;
  connection
    .query("SELECT users.username FROM users WHERE username=? AND password=?", [
      username,
      password,
    ])
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });

    connection.release();
});

server.post("/register", async (req, res) => {
  const connection = await db.getConnection();
  const username = req.body.username;
  const password = req.body.password;

  connection
    .query("INSERT INTO users VALUES(?,?)", [username, password])
    .then(() => {
      res.send("success");
    })
    .catch((err) => {
      res.send(err.name);
    });


    connection.release();
});

server.listen(3001, () => {
  console.log("Listening for stuff on port 3001");
});

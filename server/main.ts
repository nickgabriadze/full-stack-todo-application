import express, { request } from "express";
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


server.delete("/api/delete/account", async(req, res) => {
    try{
      const usernameToDelete = req.body.username;
      const connection = await db.getConnection();

      connection.query("DELETE FROM users WHERE username =?", [usernameToDelete]).then(
        (response) => {
          if(response.affectedRows === 1){
            res.sendStatus(200)
          }else{
            res.sendStatus(404);
          }
        }
      )
      
      connection.release();
    }catch(err) {
      console.log(err);
    }
})

server.delete("/api/delete/todo", async (req, res) => {
  try {
    const todoToDelete = req.body.ID;

    const connection = await db.getConnection();

    connection.query("DELETE FROM todos WHERE id =?", [todoToDelete]);

    connection.release();
  } catch (err) {
    console.log(err);
  }
});

server.put("/api/put/todos/change", async (req, res) => {
  try {
    const ID = req.body.ID;
    const title = req.body.title;
    const category = req.body.category;
    const checked = req.body.checked === 1 ? true : false;

    const connection = await db.getConnection();
    connection
      .query(
        `
       UPDATE todos SET checked=?, title=?, category=? WHERE id=?
      `,
        [checked, title, category, ID]
      )
      .then(() => {
        res.send("Updated");
      })
      .catch((err) => {
        console.log(err);
      });

    connection.release();
  } catch (error) {
    console.log(error);
  }
});

server.get("/api/get/todos", async (req, res) => {
  try {
    const username = req.query.username;

    const connection = await db.getConnection();

    connection
      .query(
        "SELECT todos.ID, todos.title, todos.checked, todos.category, todos.date FROM todos WHERE usernameFK =?",
        [username]
      )
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

server.post("/api/post/todo", async (req, res) => {
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
    })
    .catch((err) => {
      console.log(err);
    });

  connection.release();
});


server.get("/api/get/password", async(req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const connection  =  await db.getConnection();

    connection.query("SELECT password FROM users WHERE username=?", [username]).then(
      (result) => {
       

        if(result[0].password === password){
          res.send(true);
        }else{
          res.send(false);
        }
      }
    ).catch(err => {
      console.log(err);
    })


    connection.release();
})


server.put("/api/put/password", async(req, res) => {
    const username = req.body.username;
    const newPassword = req.body.newPassword;
    const connection = await db.getConnection();

    connection.query("UPDATE users SET password = ? WHERE username=?", [newPassword, username]).
    then((result) => {

      if(result.affectedRows === 1){
        res.send(true)
      }else{
        res.send(false);
      }

    }).catch(err => {
      console.log(err);
    })

    connection.release();

})

server.put("/api/put/username", async (req, res) => {
  const newUsername = req.body.newUsername;
  const oldUsername = req.body.oldUsername;
  const connection = await db.getConnection();

  connection
    .query(
      `UPDATE users SET username=? WHERE username=?`,
    [newUsername, oldUsername]
    )
    .then((result) => {
      res.send(result?.affectedRows === 1 ? "Updated" : "Couldn't Update");
    })
    .catch((err) => {
      console.log(err);
    });

  connection.release();
});

server.get("/api/get/username/", async (req, res) => {
  const usernameToCheck = req.query.username;
  const connection = await db.getConnection();

  connection
    .query("SELECT checkAvailability(?) as available", [usernameToCheck])
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      res.send(err);
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

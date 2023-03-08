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
})

server.use(cors());
server.use(express.json());


server.post("/register", async (req, res) => {
    const connection = await db.getConnection();
    const username = req.body.username;
    const password = req.body.password;
    
    connection.query(
        "INSERT INTO users VALUES(?,?)", [username, password]
    ).then(() => {
        res.send("success");
    }).catch((err) => {
       res.send(err.name)
    })

})

server.listen(3001, () => {
    console.log("Listening for stuff on port 3001");
})

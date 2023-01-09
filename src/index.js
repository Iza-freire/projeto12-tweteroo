import express from "express";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());
 
const users = new Map();
const tweets = [];
 
app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
 
    if (!username || !avatar) {
      res.status(400).send({ error: "Todos os campos são obrigatórios!" });
      return;
    }
 
    const userId = Date.now() + Math.random().toString(36).substring(2, 15);
 
    users.set(username, { avatar, userId });
 
    res.status(201).send({ message: "OK" });
});

app.post("/tweets", (req, res) => {
  const { user } = req.headers;
  const { tweet } = req.body;

  if (!user) {
    res.status(400).send({ error: "Envie o username" });
    return;
  }

  if (!tweet) {
    res.status(400).send({ error: "Envie um tweet!" });
    return;
  }

  tweets.push({ username: user, tweet: `${tweet} ${tweets.length + 1}` });

  res.status(201).send({ message: "OK" });
});




app.listen(5000, () => console.log("Server running in port: 5000"));
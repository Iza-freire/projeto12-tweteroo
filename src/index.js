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
    res.status(400).json({ error: "Missing username in request headers" });
    return;
  }

  if (!tweet) {
    res.status(400).json({ error: "Missing tweet in request body" });
    return;
  }

  if (!isUserRegistered(user)) {
    res.status(401).send({ message: "UNAUTHORIZED" });
    return;
  }

  const newTweet = {
    username: user,
    tweet: `${tweet} ${tweets.length + 1}`,
  };

  tweets.push(newTweet);

  res.status(201).send({ message: "OK" });
});

  
 app.get("/tweets", (req, res) => {
    const recentTweets = tweets.slice(-10).reverse();
 
    const tweetsWithAvatar = recentTweets.map((tweet) => {
      const user = users.find((u) => u.username === tweet.username);
      return {
        ...tweet,
        avatar: user.avatar,
      };
    });
 
    res.send(tweetsWithAvatar);
  });
 


app.listen(5000, () => console.log("Server running in port: 5000"));
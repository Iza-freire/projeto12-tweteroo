import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (request, response) => {
  const { username, avatar } = request.body;
  if (!username || !avatar) {
    response.status(400).send({ error: "Todos os campos são obrigatórios" });
    return;
  }

  const newUser = { username, avatar };
  users.push(newUser);

  response.status(201).send({ message: "OK" });
});


app.post("/tweets", (request, response) => {
  const { user } = request.headers;
  const { tweet } = request.body;

  if (!user) {
    response.status(400).send({ error: "Please send a username" });
    return;
  }

  if (!tweet) {
    response.status(400).send({ error: "Please send a tweet!" });
    return;
  }

  const registeredUser = users.find(u => u.username === user);
  if (!registeredUser) {
    response.status(401).send({ error: "Unauthorized" });
    return;
  }

  const newTweet = { username: user, tweet: `${tweet} ${tweets.length + 1}` };
  tweets.push(newTweet);

  response.status(201).send({ message: "OK" });
});


  
app.get("/tweets", (req, res) => {

    tweets.forEach((tweet) => {
      const {avatar} = users.find((user) => user.username === tweet.username)
      tweet.avatar = avatar
    });
 
    res.send(tweets.slice(-10));
   
  });
 

 


app.listen(5000, () => console.log("Server running in port: 5000"));
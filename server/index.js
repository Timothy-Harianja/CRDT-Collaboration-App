require("dotenv").config();

const express = require(`express`);
const app = express();

const port = process.env.PORT || 4000;
const corsDomains = process.env.CORS_DOMAINS || "";
const whitelist = corsDomains.split(",").map((item) => item.trim());
const Automerge = require("automerge");

let initialState = {
  jiraBoard: {
    toDo: [],
    inProgress: [],
    inReview: [],
    done: [],
  },
};

let doc = Automerge.init(initialState);

// this code might be useful for non-websocket requests.
var cors = require("cors");
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

const http = require(`http`);
const httpServer = http.createServer(app);

// const io = require("socket.io")(httpServer, {
//   cors: {
//     Array: whitelist,
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });

//   socket.on("send jiraBoard update", (docWithUpdate) => {
//     console.log("docs received");
//     console.log(docWithUpdate);
//   });
// });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/doc", (req, res) => {
  res.send(doc);
});

httpServer.listen(port, () => {
  console.log(`listening on ${port}`);
});

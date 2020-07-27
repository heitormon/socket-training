var http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const _ = require("lodash");
const { forEach } = require("lodash");
var server = http.createServer(app);

const io = require("socket.io")(server);
const users = [];
app.use(express.json());
app.use(cors());
app.get("/users", (req, res) => {
  console.log("users");
  res.send(users);
});
io.on("connect", (socket) => {
  socket.on("register", (message) => {
    console.log("Usuario Registrado " + message);
    users.push({
      name: message,
      id: socket.id,
    });
    notificarUsers();
  });

  socket.on("disconnect", () => {
    users.forEach((user, index) => {
      if (socket.id == user.id) {
        console.log(user.name + " DELETADO");
        users.splice(index);
      }
    });
    notificarUsers();
  });

  socket.on("message", (message) => {
    let index = _.findIndex(users, { id: socket.id });
    let messageBuilder = {
      messageFrom: {
        message: users[index],
      },
      messageTo: {
        message,
      },
    };
    console.log(messageBuilder);
    io.to(message.user.id).emit("message", messageBuilder);
  });
  notificarUsers();
});

function notificarUsers() {
  users.forEach((user)=>{
    io.to(user.id).emit(
      "users",_.filter(users, function(list) { return list.id != user.id; })
    );
  })
}

let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("go to http://localhost:" + port);
});

const express = require("express");
const cors = require("cors");
require('dotenv').config()

require("./db/db")

// const http = require("http");
const socket = require("socket.io");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;
// const server = http.createServer(app);

const server = app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`);
});


//import routers
const roleRouter = require(`./router/role`);
const userRouter =require(`./router/user`);
const lgonRouter =require(`./router/login`)
const messageRouter = require(`./router/message`);



app.use("/role",roleRouter);
app.use('/user',userRouter);
app.use('/login',lgonRouter);
app.use('/message',messageRouter);



//Soket Functions
const io = socket(server, {
  cors: {
    origin: "http://localhost:4200",
    
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} is connected`);

  socket.on("JOIN_ROOM", (data) => {
    console.log(data);
    // .join() is used to seperate the session into private rooms depending on the data
    socket.join(data);
  });

  socket.on("SEND_MESSAGE", (data) => {
    // .to() is used to specify to which room i will send the response/request
    socket.to(data.room).broadcast.emit("RECIEVE_MESSAGE", data.content);
    console.log(data.content);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("\nuser left ...");
  });
  
});




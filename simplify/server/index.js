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
const notificationRouter = require(`./router/notification`);



app.use("/role",roleRouter);
app.use('/user',userRouter);
app.use('/login',lgonRouter);
app.use('/message',messageRouter);
app.use('/notification',notificationRouter);



//Soket Functions
const io = socket(server, {
  cors: {
    origin: "http://localhost:4200",
    
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} is connected`);
  socket.broadcast.emit('test');
  socket.on("JOIN_ROOM", (room) => {
    console.log("Room: ",room);
    // .join() is used to seperate the session into private rooms depending on the data
    socket.join(room);
  });

 
    socket.on("LEAVE", (room)=>{
      socket.leave(room);
    console.log("leacve: ",room);
    })
 

  socket.on("SEND_MESSAGE", (data) => {
    // .to() is used to specify to which room i will send the response/request
    socket.broadcast.to(data.room).emit("RECIEVE_MESSAGE", data.content);
    console.log(data.content);
    console.log(data);
    socket.broadcast.emit('test',(data.recieve_id));
    
  });

  socket.on("disconnect", () => {
    console.log("\nuser left ...");
  });
  
});




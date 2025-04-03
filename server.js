const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors")
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(cors())
io.on("connection",(socket)=>{
    console.log(`Socket join with id ${socket.id}`);
    socket.on("join-room",(room)=>{
        socket.join(room);
        console.log(`${socket.id} join room ${room}`);
    })
    socket.on("send",(data)=>{
        socket.to(data.room).emit("recived",data)
        
    })
    socket.on("disconnect",()=>{
        console.log(`Socket of id ${socket.id} is disjoined`);
        
    })
})
app.get("/",(req,res)=>{
})
server.listen(3000)



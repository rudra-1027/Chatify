import express from 'express';
import {Server, Socket} from 'socket.io';
import http from "http";
import connectDB from './db.js';
const app = express();
app.set("trust proxy", 1);
import routes  from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Chat from './models/Chat.js';
import jwt from 'jsonwebtoken';




const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const server=http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST"],
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // for HTML form submissions (application/x-www-form-urlencoded)
await connectDB();


app.use(cookieParser());
// Routes
app.use(express.static(path.join(__dirname,"../../frontend/vite-project/dist")))
app.use("/",routes)

app.use('*',(req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/vite-project/dist/index.html"));
});






//socket part


io.use((socket,next)=>{
    const isToken= socket.handshake.auth.token ||
      socket.handshake.headers.cookie?.split("token=")[1];
    if(!isToken){
 return next(new Error("No token"));
    }

    try {
        const valid=jwt.verify(isToken,process.env.JWT_KEY)
        socket.user=valid
        next()
    } catch{
 next(new Error("Invalid token"));
    }


})
io.on('connection',(socket)=>{
  socket.on("join chat",(chatId)=>{
    socket.join(chatId)
  })
  socket.on("send message", async({chatId,message})=>{
    const msg=  await Chat.findByIdAndUpdate(chatId, {$push:{message:{senderId:socket.user.id,text:message}}},{new:true} );
    io.to(chatId).emit("new message",{message:{senderId:socket.user.id,text:message}});

  })
 

})


// Connection
const PORT = process.env.PORT || 5000
server.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})

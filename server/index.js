import express from 'express'
// const express= require('express');
import bodyParser from 'body-parser';
import Route from './routes/route.js';
import Connection from './database/db.js';
import cors from 'cors';
// import {Server} from "socket.io";

const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
// it has been used to remove blanck spaces in the 
app.use(bodyParser.urlencoded({extende: true}));
app.use('/',Route);
Connection();
const PORT=5000;
app.listen(PORT,()=>{
    console.log("server is started at PORT no : ",PORT)
})




//socket code 

// const io = new Server(9005, {
//     cors:{
//         origin:'http://localhost:3000',
//         // credentials:true
//     },
// })

// let users=[];
// const addUser= (userData, socketId)=>{
//     !users.some((user) => user.sub === userData.sub) &&  users.push({... userData, socketId});
// }


// const getUser=(userId)=>{

//     return users.find(user => user.sub === userId); 

// }

// io.on('connection',(socket) => {
//    // socket is an object which has all the information which come from the frontend

//     console.log("user connected")
//     socket.on("addUsers",(userData) => {
//         addUser(userData, socket.id);
//         // it has been used to send data to frontend from the backend
//         io.emit("getUsers",users)
//     });

//     //
//     socket.on('sendMessage',(data) =>{

//         console.log("data is ", data);
//         // if(data){
//             const user = getUser(data.receiverId);
//             io.to(user.socketId).emit('getMessage', data);

//         // }
//         // else{
//         //     console.log("error is socket")
//         // }
   

//     })
// })


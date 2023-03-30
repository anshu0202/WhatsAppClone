import {Server} from "socket.io";


const io = new Server(9000, {
    cors:{
        origin:'http://localhost:3000',
        // credentials:true
    },
})

let users=[];
const addUser= (userData, socketId)=>{
    !users.some((user) => user.sub === userData.sub) &&  users.push({... userData, socketId});
}


const getUser=(userId)=>{

    return users.find(user => user.sub === userId); 

}

io.on('connection',(socket) => {
   // socket is an object which has all the information which come from the frontend

    console.log("user connected")
    socket.on("addUsers",(userData) => {
        addUser(userData, socket.id);
        // it has been used to send data to frontend from the backend
        io.emit("getUsers",users)
    });

    //
    socket.on('sendMessage',(data) =>{

        console.log("data is ", data);
        // if(data){
            const user = getUser(data.receiverId);
            if(user){
                io.to(user.socketId).emit('getMessage', data);
            }
           

        // }
        // else{
        //     console.log("error is socket")
        // }
   

    })
})


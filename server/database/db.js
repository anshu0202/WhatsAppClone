import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


const Connection=async ()=>{
    const URL= `mongodb://${USERNAME}:${PASSWORD}@ac-gk72s0r-shard-00-00.bw7sbbm.mongodb.net:27017,ac-gk72s0r-shard-00-01.bw7sbbm.mongodb.net:27017,ac-gk72s0r-shard-00-02.bw7sbbm.mongodb.net:27017/?ssl=true&replicaSet=atlas-d4ktdo-shard-0&authSource=admin&retryWrites=true&w=majority`
     try{
        await mongoose.connect(URL,{useUnifiedTopology:true});
        console.log("connected to database successfully")     }
     catch(error){
        console.log("Error while connecting with the database ", error.message )
     }
}
export default Connection;
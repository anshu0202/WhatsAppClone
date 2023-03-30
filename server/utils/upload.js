

// it is middlewear files and photos cannot be directly uploded to the mongoDb directly


import multer from 'multer';
import Grid from 'gridfs-stream'
import {GridFsStorage}  from 'multer-gridfs-storage';


import dotenv from 'dotenv';


dotenv.config();
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

// new GridFsStorage

const storage=new GridFsStorage({
    url:`mongodb://${USERNAME}:${PASSWORD}@ac-gk72s0r-shard-00-00.bw7sbbm.mongodb.net:27017,ac-gk72s0r-shard-00-01.bw7sbbm.mongodb.net:27017,ac-gk72s0r-shard-00-02.bw7sbbm.mongodb.net:27017/?ssl=true&replicaSet=atlas-d4ktdo-shard-0&authSource=admin&retryWrites=true&w=majority`, options:{useUnifiedTopology:true, useNewUrlParser:true},
    file:(request, file)=>{
        const match=["image/png","image/jpg"];

        if(match.indexOf(file.mimeType)===-1){
            return `${Date.now()}-file-${file.originalname}`;

        }


        return {
            bucketName:"photos",
            filename:`${Date.now()}-file-${file.originalname}`
            // filename:function( req, file,cb){
            //     // `${file.originalname}`
            //     cb(null,file.originalname)
            // }
        }
    }
})

export default multer({storage:storage});
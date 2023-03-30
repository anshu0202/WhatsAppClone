

import grid from 'gridfs-stream';
import mongoose from 'mongoose';
// import {GridFsBucket} from 'mongodb'


const url="http://localhost:5000";

let gfs,gridFsBucket;
const conn=mongoose.connection;
conn.once('open',()=>{
     gridFsBucket= new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'fs'
    });

    gfs= grid(conn.db,mongoose.mongo);
    gfs.collection('fs')
});
 

export const uploadFile = (req,res)=>{
    console.log("laxman")
        if(!req.file){
         
            return res.status(404).json('File not found')
        }
        //  console.log("req body is ",req);
            const imageUrl= `${url}/file/${req.file.filename}`
            console.log("image url is ",imageUrl)
            return res.status(200).json(imageUrl);
        }


export const getImage= async(req,res)=>{
    //    console.log("ram")

    //    console.log("get file body is ",req)
      try{
        const file= await gfs.files.findOne({filename: req.params.filename});
        const readStream=gridFsBucket.openDownloadStream(file._id);
            // stream k saath pipe ka use kaise krte h ??
        // console.log("file is  -->  ",file);
        readStream.pipe(res);

        //   return res.status(200).json(file)
        // return res.status(200).json("file has been fetched")
      }
      catch(error){
         return res.status(500).json(error.message)
      }
}


// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const multer = require('multer');
// const path = require('path');

// const conn = mongoose.createConnection('mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('file'), (req, res) => {
//   const { filename } = req.file;
//   const writestream = gfs.createWriteStream({
//     filename,
//     metadata: req.body
//   });
//   const readStream = fs.createReadStream(`./uploads/${filename}`);
//   readStream.pipe(writestream);
//   writestream.on('close', (file) => {
//     res.json({ url: `/files/${file._id}` });
//   });
// });
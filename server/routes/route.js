import express from 'express';
import { addUser,getUsers } from '../controller/user-controller.js';
import { newConversation,getConversation } from '../controller/conversation-controller.js';
 import { newMessage, getMessages} from '../controller/message-controller.js';
import { uploadFile,getImage } from '../controller/image-controller.js';

import upload from '../utils/upload.js';


const Route=express.Router();

Route.post('/add',addUser)
Route.get('/users',getUsers)
Route.post('/conversation/add', newConversation)
Route.post('/conversation/get',getConversation)
Route.post('/message/add',newMessage)
Route.get('/message/get/:id',getMessages);
// file name has been passed
Route.post('/file/upload',upload.single("file"),uploadFile)
Route.get('/file/:filename', getImage)


export default Route;
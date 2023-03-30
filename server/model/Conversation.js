import mongoose from "mongoose";

const ConversationSchema=new mongoose.Schema({
    members:{
        type:Array
    },
    // it is used to show the latest message
    message:{
        type:String
    }
},
{
    timestamps:true
}
);

const conversation=mongoose.model('Conversation', ConversationSchema);
export default conversation;
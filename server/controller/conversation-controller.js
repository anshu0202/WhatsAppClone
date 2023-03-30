

// import Conversation from "../../client/src/components/chat/menu/Conversation";
import Conversation from "../model/Conversation.js";
export const newConversation = async(req,res)=>{
        try{
            //   console.log("ids are: ",req.body)
                const senderId= req.body.senderId;
                const receiverId= req.body.receiverId;
                // console.log("new conversation function is called id are ",senderId,"  --  ",receiverId);
                const exist=await Conversation.findOne({
                    members:{
                        //$all means sender and receiver id should match then only work
                        $all:[receiverId,senderId]
                    }
                })

                if(exist){
                    return res.status(200).json('conversation already exists')
                }
                else{

                    const newConversation=  new Conversation({
                        members:[senderId,receiverId]
                    })
                    await newConversation.save();
                    return res.status(200).json('conversation saved successfully with ids ',senderId,"  --  ",receiverId)
                }
        }
        catch(error){

            return res.status(500).json(error.message)
        }


}

export const getConversation=async (req,res)=>{
    try{

        const senderId=req.body.senderId
        const receiverId=req.body.receiverId;

        // console.log("Get ** conversation function is called id are ",senderId,"  --  ",receiverId);

           let conversation= await Conversation.findOne({members:{$all:[senderId,receiverId]}})
           return res.status(200).json(conversation)
    }
    catch(error){
        return res.status(500).json(error.message);

    }
}
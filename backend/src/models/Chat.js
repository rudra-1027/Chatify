import mongoose from "mongoose";
const {Schema}=mongoose;

const ChatSchema=new Schema({ 
    participants:[
      {
        type:String
      }
      ],
    message: [
    {
      senderId: String,
      text:String,
      sentAt:{
        type:Date,
        default:Date.now,
      },
      seenBy:[
        {
          userId:String,
          seenAt:{
            type:Date,
            default:Date.now,
          }
        }
      ]
      
    }
  ]})

  const Chat=new mongoose.model("Chat",ChatSchema)
  export default Chat
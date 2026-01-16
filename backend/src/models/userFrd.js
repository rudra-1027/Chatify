import mongoose from "mongoose";
const {Schema}=mongoose;

const UserFrdSchema=new Schema({
    userId:String,
    friends: [
    {
      friendId: String,
      status: {
        type: String,
        enum: ["requested", "accepted", "add"],
        default: "add"
      }
    }
  ]
})

const UserFrd=new mongoose.model("UserFrd",UserFrdSchema);
export default UserFrd;

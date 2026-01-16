import mongoose from "mongoose";
const {Schema}=mongoose;

const UserInfoSchema=new Schema({
    userId:String,
    user:String,
    bio:String,
    profile:String


})

const UserInfo=mongoose.model("UserInfo",UserInfoSchema);
export default UserInfo;
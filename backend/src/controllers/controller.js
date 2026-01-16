import express from 'express'
import User from '../models/user.js';
import UserInfo from '../models/userInfo.js';
import UserFrd from '../models/userFrd.js';
import Chat from '../models/Chat.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const app=express();



 const signup=async(req, res) => {
    try {
       //fetching form details
        const {email,password,cpassword}=req.body;
         const username = email.split("@")[0];


        //finding the existing user
        const exist=await User.findOne({email})
        if(exist){
           return res.send(`<script>alert("the user already exists!"); window.location.href="/"</script>`)
        }
        if(password !=cpassword){
            return res.send(`<script>alert("the pass and confirm pass does not match !"); window.location.href="/"</script>`)
 
        }


        //password hashing
        const hashPassword=await bcrypt.hash(password,10);
        
        //storing the new user
        const user=new User({email:email,password:hashPassword,user: username,});
        await user.save();
        const DEFAULT_AVATAR =
      "https://ui-avatars.com/api/?name=" +
      username +
      "&background=6366f1&color=fff";
      const userInfo = new UserInfo({
      userId: user._id,
      user: username,
      bio: "",
      profile: DEFAULT_AVATAR,
    });

    await userInfo.save();
       
        const token=await user.genrateToken();
      res.cookie("token", token, {
  httpOnly: true,
  secure: true,         
  sameSite: "lax",       
  maxAge: 24 * 60 * 60 * 1000
});
        res.redirect("/setProfile");

       
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const login= async(req, res) => {
    try {
       
       
       const {email,password}=req.body;
       const exist=await User.findOne({email});
       if(!exist){
       return res.send(`<script>alert("The user does not exist"); window.location.href = "/login";</script>`)
        
       }
       let ismatch=await bcrypt.compare(password,exist.password);
       if(!ismatch){
       return res.send(`<script>alert("The pass does not match"); window.location.href = "/login";</script>`)
       }
       const token=await exist.genrateToken();
         res.cookie("token", token, {
  httpOnly: true,
  secure: true,         
  sameSite: "lax",       
  maxAge: 24 * 60 * 60 * 1000
});
       res.redirect('/home');
        
       
        
       
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const setProfile= async(req,res)=>{
    try {
        
        const user_id=req.user.id;
        const {user,bio}=req.body;
           const DEFAULT_AVATAR =
      "https://ui-avatars.com/api/?name=" +
      user +
      "&background=6366f1&color=fff";
        const imgurl=req.file ? req.file.path : DEFAULT_AVATAR;

        const exist=await User.findOne({user,_id: { $ne: user_id }} ); //excluding the current user
        const existsInfo=await UserInfo.findOne({userId:user_id});
        if(exist ){
             return res.send(`<script>alert("The username already exists"); window.location.href = "/setProfile";</script>`)
        }
         
       
      const update=await User.findByIdAndUpdate(user_id, { user}); 
      if(!existsInfo){
        const CreateInfo=new UserInfo({userId:user_id,user,bio,profile:imgurl});
        await CreateInfo.save();
        
      }
      if(existsInfo){
        const demo=await UserInfo.findOneAndUpdate({userId:user_id},{user,bio,profile:imgurl});
        
      }
      
      
      res.redirect('/home')
        

        
    } catch (error) {
         res.status(500).send(error.message)
    }
}


const getChatList=async (req,res)=>{
    try {
        const user_id=req.user.id;
        const userInfo=await UserInfo.findOne({userId:user_id});
        
        const frd=await UserFrd.findOne({userId:user_id});
        if(!frd){
            return res.json({userInfo:userInfo,frdInfo:[]});
        }
        const frdId=frd.friends.filter(f=>f.status==="accepted").map(f=>f.friendId);
        const frdInfo=await UserInfo.find({userId:{$in:frdId}});
let frdStatus = await Chat.find({
  participants: { $in: [user_id] }
});
const chatMap = {};

    frdStatus.forEach(chat => {
      const otherUser = chat.participants.find(id => id !== user_id);
      const lastMsg = chat.message?.at(-1);

      chatMap[otherUser] = {
        chat,
        lastTime: lastMsg
          ? new Date(lastMsg.sentAt || lastMsg.createdAt)
          : new Date(0)
      };
    });


    const sortedFriends = frdInfo
      .map(f => ({
        ...f.toObject(),
        lastTime: chatMap[f.userId]?.lastTime || new Date(0),
        chat: chatMap[f.userId]?.chat || null
      }))
      .sort((a, b) => b.lastTime - a.lastTime);




        res.json({userInfo:userInfo,frdInfo:sortedFriends,frdStatus});
    } catch (error) {
        console.error(error)
    }
}
const getFrdList=async(req,res)=>{
    const user_id=req.user.id;
        
const frd = await UserFrd.find({
  friends: {
    $elemMatch: {
      friendId: user_id,
      status: "requested"
    }
  }
});        
         if(!frd.length){
            return res.json({frdInfo:[]});
        }
        const frdId=frd.map(doc => doc.userId);
        const frdInfo=await UserInfo.find({userId:{$in:frdId}});
        
    res.json({frdInfo});
}

const search= async(req,res)=>{
    try {
        const q=req.query.q;
        const userId=req.user.id;
         if (!q) {
    return res.json([]);
  }
 const user = await UserInfo.find({
      user: { $regex: q, $options: "i" },
      userId: { $ne: new mongoose.Types.ObjectId(userId) }
    });        res.json(user);
    } catch (error) {
        console.error(error)
    }
}

const getStatus=async(req,res)=>{
    try {
        const user_id=req.user.id;
        const {friendId}=req.body;
        const user_status=await UserFrd.findOne({userId:user_id,"friends.friendId":friendId});
        const frd_status=await UserFrd.findOne({userId:friendId,"friends.friendId":user_id})
        if(user_status ){
            const relation=user_status.friends.find(f=>f.friendId.toString()===friendId)
            if(relation.status=="requested"){
            return res.json({status:"requested"})
            }
             if(relation.status=="accepted"){
            return res.json({status:"accepted"})
            }
        }
        else if(frd_status){
            const relation=frd_status.friends.find(f=>f.friendId.toString()===user_id)
             if (relation.status === "requested") {
        return res.json({ status: "accept" });
      }

      if (relation.status === "accepted") {
        return res.json({ status: "accepted" });
      }
        }
        else{
            return res.json({ status: "add" });
        }
    } catch (error) {
        console.error(error)
    }
}

const addFrd=async(req,res)=>{
    try {
       
        const user_id=req.user.id;
        const {friendId}=req.body;
       
        const exist_frd=await UserFrd.findOne({userId:friendId,"friends.friendId":user_id,"friends.status":"requested"})
        if(exist_frd){
             await UserFrd.findOneAndUpdate({userId:friendId,"friends.friendId":user_id}, {$set:{"friends.$.status": "accepted"} } );
             await UserFrd.findOneAndUpdate(
        { userId: user_id },
        { $addToSet: { friends: { friendId, status: "accepted" } } },
        { upsert: true }
      );
            return res.json({status:"accepted"})
        }
        // const exist_requested=await UserFrd.findOne({userId:user_id,"friends.friendId":friendId,"friends.status":"requested"});
         const exist_user=await UserFrd.findOne({userId:user_id,"friends.friendId":friendId});
        if(!exist_user){
            await UserFrd.findOneAndUpdate({userId:user_id}, {$push:{friends:{friendId,status:"requested"}}},{upsert:true} );
            
             return res.json({ status: "requested" });
        }
           const friend = exist_user.friends.find(
      f => f.friendId.toString() === friendId
    );

  
    if (friend.status === "requested") {
      await UserFrd.findOneAndUpdate(
        { userId: user_id },
        { $pull: { friends: { friendId } } }
      );
     return res.json({ status: "add" });
    }
        // else if(exist_requested){
        //    await UserFrd.findOneAndUpdate({userId:user_id,"friends.friendId":friendId}, {friends:{status:"add"}},{upsert:true} );
        //    return res.json({ status: "add" });
        // }
        // else if(!exist_requested){
        //     await UserFrd.findOneAndUpdate({userId:user_id,"friends.friendId":friendId}, {friends:{status:"requested"}},{upsert:true} );
        //    return res.json({ status: "requested" });
        // }
         if (friend.status === "accepted") {
      return res.json({ status: "accepted" });
    }
        return res.json({ status: "add" });

         
    } catch (error) {
        console.error(error);
    }
}
const acceptFrd=async(req,res)=>{
    try {
       
        const user_id=req.user.id;
        const {frd}=req.body;
        const chk=await UserFrd.findOneAndUpdate({userId:user_id,"friends.friendId":frd.userId}, {$set:{"friends.$.status": "accepted"} } );
        if(!chk){
            await UserFrd.findOneAndUpdate(
        { userId: user_id },
        { $addToSet: { friends: { friendId: frd.userId, status: "accepted" } } },
        { upsert: true }
      );
        }
        
            const updated = await UserFrd.findOneAndUpdate(
      { userId: frd.userId, "friends.friendId": user_id },
      { $set: { "friends.$.status": "accepted" } }
    );
     if (!updated) {
      await UserFrd.findOneAndUpdate(
        { userId: frd.userId },
        { $addToSet: { friends: { friendId: user_id, status: "accepted" } } },
        { upsert: true }
      );
    }
        
          return res.json({ status: "accepted" });
    } catch (error) {
        console.error(error);
    }
}
const reject=async(req,res)=>{
    try {
        const user_id=req.user.id;
        const {frd}=req.body;
         await UserFrd.findOneAndUpdate(
      { userId: frd.userId },
      { $pull: { friends: { friendId: user_id } } }
    );
    return res.json({ status: "rejected" });

    } catch (error) {
        console.error(eror);
         return res.status(500).json({ error: "Reject failed" });
    }
}
const OpenChat=async(req,res)=>{
    try {
        const userId=req.user.id
        const {friendId}=req.body;
        let chat=await Chat.findOne({participants:{$all:[userId,friendId]}});
        if(!chat){
            chat=new Chat({participants:[userId,friendId],message:[]});
            await chat.save();
        }

        //seen logic
       
            const seen= await Chat.updateOne(
  { _id: chat._id },
  {
    $addToSet: {
      "message.$[msg].seenBy": { userId },
    },
  },
  {
    arrayFilters: [
      { "msg.senderId": { $ne: userId } }
    ],
  }
);

        
       
        res.json({chatId:chat._id,userId});
    } catch (error) {
        console.error(error);
    }
}

const getMessage=async (req,res)=>{
    try {
        const userId=req.user.id;
        const {chatId}=req.body;
        const chat=await Chat.findOne({_id:chatId,participants:userId});
        if(!chat){
             return res.status(403).json({ error: "Access denied" });
        }
        
        res.json(chat);
    } catch (error) {
        console.error(error)
    }
}
const logout=async(req,res)=>{
    try {
   res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
});


    return res.send(`<script>alert("Logged out suceesfully!"); window.location.href = "/login";</script>`)
  } catch (err) {
    res.status(500).json({ success: false, message: "Logout failed" });
  }
}
export default{
    signup,
    login,
    setProfile,
    search,addFrd,getStatus,getChatList,OpenChat,getMessage,getFrdList,acceptFrd,logout,reject
}

import mongoose from 'mongoose';
const { Schema } = mongoose;
import jwt from 'jsonwebtoken'
import env from 'dotenv'

const UserSchema = new Schema({
  email: String, 
  password: String,
  user:String,
  
  
  
});


UserSchema.methods.genrateToken=async function(){
  try {
    return jwt.sign({
      id:this._id.toString(),
      email:this.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn:"1d",
    })
    
  } catch (error) {
    console.error(error);
    
  }
}

const User=mongoose.model("User",UserSchema)
export default User;
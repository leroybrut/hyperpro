// User.model.js
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
   username: {
       type: String,
       required: true
   },
   body: {
       type: String
   }
});

const User = mongoose.model("User", userSchema);
export default User;

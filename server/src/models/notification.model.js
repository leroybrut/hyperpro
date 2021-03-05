// User.model.js
import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
   notification: {
       type: String,
       required: true
   },
   level: {
       type: String
   }
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;

import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
  message: { type: String },
  sender: { type: mongoose.SchemaTypes.ObjectId, required: true },
  receiver: { type: mongoose.SchemaTypes.ObjectId, required: true },
  patient: { type: mongoose.SchemaTypes.ObjectId, required: true },
});
const NotificationModel = mongoose.model("Notification", NotificationSchema);
export { NotificationModel as Notification };

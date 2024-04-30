import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
  message: { type: String },
  sender: { type: mongoose.SchemaTypes.ObjectId, required: true },
  patients: [{ type: mongoose.SchemaTypes.ObjectId }],
});
const NotificationModel = mongoose.model("Notification", NotificationSchema);
export { NotificationModel as Notification };

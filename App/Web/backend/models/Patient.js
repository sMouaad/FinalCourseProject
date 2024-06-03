import mongoose from "mongoose";
const Image = new mongoose.Schema({
  person: { type: String },
  relation: { type: String },
  encoding: [{ type: Number }],
  imagePath: { type: String },
});
const TodoSchema = new mongoose.Schema({
  task: String,
  done: {
    type: Boolean,
    default: false,
  },
});
const Messages = new mongoose.Schema({
  sender: { type: mongoose.SchemaTypes.ObjectId },
  messageContent: { type: String },
});
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  condition: { type: String, required: true },
  primaryAssistant: { type: mongoose.SchemaTypes.ObjectId, required: true },
  assistants: [{ type: mongoose.SchemaTypes.ObjectId }],
  doctors: { type: mongoose.SchemaTypes.ObjectId },
  images: [Image],
  instructions: [TodoSchema],
  messages: [Messages],
});
const PatientModel = mongoose.model("Patient", PatientSchema);
export { PatientModel as Patient };

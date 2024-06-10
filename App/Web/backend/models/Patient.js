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

// {
//   text: 'Hello',
//   user: { _id: '66539226e6ab7c1ee63acd04', avatar: 7 },
//   createdAt: '2024-06-03T12:23:54.249Z',
//   _id: '49ee0ae1-09de-43e8-8de5-b160f0b8b5a2'
// }
const Messages = new mongoose.Schema({
  text: { type: String },
  user: {
    id: mongoose.SchemaTypes.ObjectId,
    avatar: Number,
  },
  createdAt: { type: Date },
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

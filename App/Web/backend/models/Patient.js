import mongoose from "mongoose";
const Image = new mongoose.Schema({
  person: { type: String },
  relation: { type: String },
  encoding: [{ type: Number }],
  imagePath: { type: String },
});
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  primaryAssistant: { type: mongoose.SchemaTypes.ObjectId, required: true },
  assistants: [{ type: mongoose.SchemaTypes.ObjectId }],
  doctors: { type: mongoose.SchemaTypes.ObjectId },
  images: [Image],
});
const PatientModel = mongoose.model("Patient", PatientSchema);
export { PatientModel as Patient };
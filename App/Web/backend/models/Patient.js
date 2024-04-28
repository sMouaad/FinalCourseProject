import mongoose from "mongoose";
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  primaryAssistant: { type: mongoose.SchemaTypes.ObjectId, required: true },
  assistants: [{ type: mongoose.SchemaTypes.ObjectId }],
  doctors: [{ type: mongoose.SchemaTypes.ObjectId }],
});
const PatientModel = mongoose.model("Patient", PatientSchema);
export { PatientModel as Patient };

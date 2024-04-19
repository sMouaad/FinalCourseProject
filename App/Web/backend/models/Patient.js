import mongoose from "mongoose";
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  condition: { type: String, required: true },
  primaryAssistant: { type: mongoose.SchemaTypes.ObjectId, required: true },
  assistants: [{ type: mongoose.SchemaTypes.ObjectId }],
  password: { type: String, required: true },
});
const PatientModel = mongoose.model("Patient", PatientSchema);
export { PatientModel as Patient };

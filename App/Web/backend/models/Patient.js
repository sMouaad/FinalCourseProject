import mongoose from "mongoose";
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  condition: { type: String, required: true },
  primaryAssistant: { type: Schema.Types.ObjectId, ref: "User" },
  assistants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  password: { type: String, required: true },
});
const PatientModel = mongoose.model("Patient", PatientSchema);
export { PatientModel as Patient };

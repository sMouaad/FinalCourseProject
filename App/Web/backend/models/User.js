import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  keyword: { type: String },
  image: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
});

const UserModel = mongoose.model("User", UserSchema);
export { UserModel as User };

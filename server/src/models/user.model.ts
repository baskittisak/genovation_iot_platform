import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);

export default mongoose.model("users", userSchema);

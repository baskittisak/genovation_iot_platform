import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    feature: Array<String>,
  },
  { versionKey: false }
);

export default mongoose.model("devices", deviceSchema);

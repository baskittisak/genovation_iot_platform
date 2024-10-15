import mongoose from "mongoose";
import { z } from "zod";

const deviceSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    feature: Array<String>,
  },
  { versionKey: false }
);

export default mongoose.model("devices", deviceSchema);

export const typeDevice = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  feature: z
    .array(z.string().min(1, "Feature is required"))
    .min(1, "At least one feature is required"),
});

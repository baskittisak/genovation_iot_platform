import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/iot_platform");
    console.log("Database Connected");
  } catch (error) {
    console.error(error);
  }
};

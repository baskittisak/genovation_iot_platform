import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const { DB_URL } = process.env;
    if (!DB_URL) throw "Internal server error: Missing DB_URL";

    await mongoose.connect(DB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.error(error);
  }
};

 import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_url, 
    console.log("MongoDB connected successfully"));
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;
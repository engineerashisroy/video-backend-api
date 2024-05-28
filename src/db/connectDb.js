import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection successfully");
  } catch (error) {
    console.log("Database connect failed", error);
  }
};

export default connectDb;

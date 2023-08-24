import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  } catch (err) {
    console.log("Errororororoororo");
  }
};
export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
   await mongoose.connect(process.env.MONGOO_URI);
   console.log("Connection Successful");
};

export default connectDB;

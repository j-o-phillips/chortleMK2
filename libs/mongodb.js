import mongoose from "mongoose";

// track the connection
let isConnected = false;

const connectMongoDB = async () => {
  if (isConnected) {
    console.log("DB connected already");
    return;
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;

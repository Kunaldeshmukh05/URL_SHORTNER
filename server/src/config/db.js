import mongoose from "mongoose";
import {db_name} from "../constants/project_constants.js";
const connectDB = async () => {
  try {

const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`);

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(
      `MongoDB connection failed: ${error.message}`
    );

    process.exit(1);
  }
};

export default connectDB;
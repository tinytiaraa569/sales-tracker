import mongoose from "mongoose"

const connectDB = async () => {
  try {
    // Use environment variable or default to local MongoDB
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/sales-tracker"

    await mongoose.connect(mongoURI)

    console.log(" MongoDB Connected Successfully")
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message)
    process.exit(1)
  }
}

export default connectDB

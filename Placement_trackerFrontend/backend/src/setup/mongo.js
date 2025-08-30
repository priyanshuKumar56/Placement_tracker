import mongoose from "mongoose"

export async function connectDB() {
  const url = process.env.MONGO_URL
  if (!url) throw new Error("MONGO_URL missing")
  await mongoose.connect(url)
  console.log("[backend] connected to MongoDB")
}

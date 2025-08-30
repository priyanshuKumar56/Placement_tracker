import dotenv from "dotenv"
dotenv.config()

process.env.JWT_SECRET ||= "replace-me-in-prod"
process.env.MONGO_URL ||= "mongodb://127.0.0.1:27017/career_hub"

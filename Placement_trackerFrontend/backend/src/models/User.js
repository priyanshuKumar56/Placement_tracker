import mongoose from "mongoose"

export const Roles = {
  STUDENT: "student",
  RECRUITER: "recruiter",
  TPO: "tpo",
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(Roles), required: true },
    companyName: { type: String }, // for recruiters
  },
  { timestamps: true },
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User

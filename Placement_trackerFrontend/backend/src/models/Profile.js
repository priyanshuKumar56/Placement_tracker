import mongoose from "mongoose"

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    headline: String,
    bio: String,
    skills: { type: [String], default: [] },
    links: { type: Map, of: String },
    resumeUrl: String,
  },
  { timestamps: true },
)

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema)
export default Profile

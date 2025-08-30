import mongoose from "mongoose"

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, default: "Remote" },
    type: { type: String, default: "Full-time" },
    description: { type: String, default: "" },
    skills: { type: [String], default: [] },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
)

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema)
export default Job

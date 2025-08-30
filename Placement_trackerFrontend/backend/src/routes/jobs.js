import { Router } from "express"
import Job from "../models/Job.js"
import { requireAuth, requireRole } from "../middleware/auth.js"
import { Roles } from "../models/User.js"

const router = Router()

// public list
router.get("/", async (_req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 }).limit(50).lean()
  res.json(jobs)
})

// recruiter creates
router.post("/", requireAuth, requireRole(Roles.RECRUITER), async (req, res) => {
  const { title, description, skills = [], location = "Remote", type = "Full-time" } = req.body || {}
  if (!title) return res.status(400).json({ error: "title required" })
  const job = await Job.create({
    title,
    description,
    skills,
    location,
    type,
    companyId: req.user.sub,
  })
  res.status(201).json(job)
})

// student applies
router.post("/:jobId/apply", requireAuth, requireRole(Roles.STUDENT), async (req, res) => {
  const { jobId } = req.params
  const job = await Job.findById(jobId)
  if (!job) return res.status(404).json({ error: "job not found" })
  if (!job.applicants.includes(req.user.sub)) {
    job.applicants.push(req.user.sub)
    await job.save()
  }
  res.json({ ok: true })
})

export default router

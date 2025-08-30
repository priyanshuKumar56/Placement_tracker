import { Router } from "express"
import Profile from "../models/Profile.js"
import { requireAuth } from "../middleware/auth.js"

const router = Router()

// public preview by userId
router.get("/user/:userId", async (req, res) => {
  const profile = await Profile.findOne({ userId: req.params.userId }).lean()
  if (!profile) return res.status(404).json({ error: "not found" })
  res.json(profile)
})

// get my profile
router.get("/me", requireAuth, async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.sub }).lean()
  res.json(profile || {})
})

// upsert my profile
router.put("/me", requireAuth, async (req, res) => {
  const updated = await Profile.findOneAndUpdate(
    { userId: req.user.sub },
    { $set: req.body || {} },
    { upsert: true, new: true },
  )
  res.json(updated)
})

export default router

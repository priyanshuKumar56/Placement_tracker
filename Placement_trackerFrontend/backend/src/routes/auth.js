import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User, { Roles } from "../models/User.js"
import { z } from "zod"

const router = Router()

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum([Roles.STUDENT, Roles.RECRUITER, Roles.TPO]),
  companyName: z.string().optional(),
})

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const { name, email, password, role, companyName } = parsed.data

  const exists = await User.findOne({ email })
  if (exists) return res.status(409).json({ error: "Email already in use" })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash, role, companyName })

  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
  res.status(201).json({ token, user: { id: user._id, name, email, role, companyName } })
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())

  const { email, password } = parsed.data
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ error: "Invalid credentials" })

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: "Invalid credentials" })

  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, companyName: user.companyName },
  })
})

export default router

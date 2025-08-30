import jwt from "jsonwebtoken"
import User from "../models/User.js"

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: "Unauthorized" })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch {
    return res.status(401).json({ error: "Invalid token" })
  }
}

export function requireRole(...roles) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" })
    const user = await User.findById(req.user.sub).lean()
    if (!user) return res.status(401).json({ error: "Unauthorized" })
    if (!roles.includes(user.role)) return res.status(403).json({ error: "Forbidden" })
    next()
  }
}

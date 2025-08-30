import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import authRoutes from "./routes/auth.js"
import jobRoutes from "./routes/jobs.js"
import profileRoutes from "./routes/profiles.js"

const app = express()
app.use(helmet())
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))
app.use(express.json())
app.use(morgan("dev"))

app.get("/", (_req, res) => res.json({ ok: true, name: "career-hub-backend" }))

app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/profiles", profileRoutes)

export default app

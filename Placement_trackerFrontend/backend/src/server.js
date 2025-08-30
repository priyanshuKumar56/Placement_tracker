import "./setup/env.js"
import app from "./app.js"
import { connectDB } from "./setup/mongo.js"

const port = process.env.PORT || 4000

async function start() {
  await connectDB()
  app.listen(port, () => {
    console.log(`[backend] listening on http://localhost:${port}`)
  })
}

start().catch((err) => {
  console.error("[backend] failed to start", err)
  process.exit(1)
})

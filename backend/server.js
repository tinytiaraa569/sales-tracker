import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import locationRoutes from "./routes/locationRoutes.js"
import visitRoutes from "./routes/visitRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()


// Routes
app.use("/api/locations", locationRoutes)
app.use("/api/visits", visitRoutes)

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`)
})

import mongoose from "mongoose"

const visitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  locationId: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: Date,
  duration: Number,
  address: {
    country: String,
    state: String,
    city: String,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

visitSchema.index({ userId: 1, startTime: -1 })

export default mongoose.model("Visit", visitSchema)

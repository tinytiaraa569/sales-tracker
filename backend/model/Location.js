import mongoose from "mongoose"

const locationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  address: {
    country: String,
    state: String,
    city: String,
    street: String,
    postalCode: String,
  },
  accuracy: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
})

locationSchema.index({ userId: 1, timestamp: -1 })

export default mongoose.model("Location", locationSchema)

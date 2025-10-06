import express from "express"
import {
  createLocation,
  bulkCreateLocations,
  getLocationsByUser,
  getLocationTimeline,
} from "../controller/locationController.js"

const router = express.Router()

router.post("/", createLocation)
router.post("/bulk", bulkCreateLocations)
router.get("/user/:userId", getLocationsByUser)
router.get("/timeline/:userId", getLocationTimeline)

export default router

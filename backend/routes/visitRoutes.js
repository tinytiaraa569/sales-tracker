import express from "express"
import { createVisit, getVisitsByUser, updateVisit } from "../controller/visitController.js"

const router = express.Router()

router.post("/", createVisit)
router.get("/user/:userId", getVisitsByUser)
router.put("/:id", updateVisit)

export default router

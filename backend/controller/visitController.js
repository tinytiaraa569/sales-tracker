import Visit from "../model/Visit.js"

// Create visit
export const createVisit = async (req, res) => {
  try {
    const visit = new Visit(req.body)
    await visit.save()

    res.status(201).json({
      success: true,
      data: visit,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Get visits by user
export const getVisitsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { startDate, endDate } = req.query

    const query = { userId }

    if (startDate || endDate) {
      query.startTime = {}
      if (startDate) query.startTime.$gte = new Date(startDate)
      if (endDate) query.startTime.$lte = new Date(endDate)
    }

    const visits = await Visit.find(query).populate("locationId").sort({ startTime: -1 })

    res.json({
      success: true,
      count: visits.length,
      data: visits,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Update visit
export const updateVisit = async (req, res) => {
  try {
    const { id } = req.params
    const visit = await Visit.findByIdAndUpdate(id, req.body, { new: true })

    res.json({
      success: true,
      data: visit,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

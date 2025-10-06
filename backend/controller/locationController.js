import Location from "../model/Location.js"

// Create new location entry
export const createLocation = async (req, res) => {
  try {
    const { userId, coordinates, address, accuracy, isOnline } = req.body

    const location = new Location({
      userId,
      coordinates,
      address,
      accuracy,
      isOnline: isOnline !== undefined ? isOnline : true,
      timestamp: new Date(),
    })

    await location.save()

    res.status(201).json({
      success: true,
      data: location,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Bulk create locations (for offline sync)
export const bulkCreateLocations = async (req, res) => {
  try {
    const { locations } = req.body

    const savedLocations = await Location.insertMany(locations)

    res.status(201).json({
      success: true,
      count: savedLocations.length,
      data: savedLocations,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Get locations by user
export const getLocationsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { startDate, endDate, limit = 100 } = req.query

    const query = { userId }

    if (startDate || endDate) {
      query.timestamp = {}
      if (startDate) query.timestamp.$gte = new Date(startDate)
      if (endDate) query.timestamp.$lte = new Date(endDate)
    }

    const locations = await Location.find(query).sort({ timestamp: -1 }).limit(Number.parseInt(limit))

    res.json({
      success: true,
      count: locations.length,
      data: locations,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Get location timeline
export const getLocationTimeline = async (req, res) => {
  try {
    const { userId } = req.params
    const { date } = req.query

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const locations = await Location.find({
      userId,
      timestamp: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ timestamp: 1 })

    res.json({
      success: true,
      date,
      count: locations.length,
      data: locations,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

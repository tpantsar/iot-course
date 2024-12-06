import Express, { NextFunction, Request, Response } from 'express'

import {
  TemperatureIn,
  TemperatureOut,
  Humidity,
  Pressure,
  IWeatherData,
} from '../../models/WeatherData'
import { Model } from 'mongoose'

const router = Express.Router()

class TimestampError extends Error {
  constructor() {
    super('Start date must be before end date')
    this.name = 'TimestampError'
  }
}

// Creates and returns a MongoDB query based on string representations of date
// throws an exception if start or end strings are not valid dates, or end is before start
const makeDBQuery = (start: string, end: string) => {
  // Create the date objects
  const startDate = new Date(start)
  const endDate = new Date(end)
  // If startDate since Epoch has more milliseconds, it's set to later date
  // so throw an error here
  if (startDate.getTime() > endDate.getTime()) throw new TimestampError()
  // Or if everything is good, return the query here
  else return { timestamp: { $gt: startDate, $lt: endDate } }
}

const handleQuery = async <T>(req: Request, res: Response, model: Model<T>, next: NextFunction) => {
  try {
    const query = makeDBQuery(req.query.start.toString(), req.query.end.toString())
    res.json(await model.find(query))
  } catch (error) {
    next(error)
  }
}

// Handlers

router.get(
  '/temperature_in',
  async (req, res, next) => await handleQuery(req, res, TemperatureIn, next)
)

router.get(
  '/temperature_out',
  async (req, res, next) => await handleQuery(req, res, TemperatureOut, next)
)

router.get('/humidity', async (req, res, next) => await handleQuery(req, res, Humidity, next))

router.get('/pressure', async (req, res, next) => await handleQuery(req, res, Pressure, next))

// Error handler

router.use((err: Error, req, res, next) => {
  console.error(err)
  if (err.name == 'TimestampError') res.status(400).json({ error: err.message })
  else res.status(400).json({ error: 'Invalid query parameters' })
})

export default router

import express from 'express'
// Import data from DB
import ctfController from '../controllers/ctfController.js'

const EventRouter= express.Router()
EventRouter.get('/', ctfController.getEvents)
EventRouter.get('/:eventID',ctfController.getEventsById)
console.log('Router exported')
export default EventRouter
import express, {Request, Response}  from 'express'
import { getEvents, getEventByUserId, getEventById } from './../dao'


const eventsRouter = express.Router()


// Get All
eventsRouter.get('/', async (req: Request, res: Response) => {
	const events = await getEvents()
	res.send(events)
})

// Get event by userid
eventsRouter.get('/user/:userid', async (req: Request, res: Response) => {
	const userId = req.params.userid

	const event = await getEventByUserId(userId)
	res.send(event)
})

// Get event by id
eventsRouter.get('/event/:id', async (req: Request, res: Response) => {
	const id = req.params.id
	const event = await getEventById(id)
	res.send(event)
})


export default eventsRouter
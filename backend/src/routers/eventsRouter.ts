import express, {Request, Response}  from 'express'
import { getEvents, getEventByUserId, getEventById } from './../dao'

interface CustomRequest extends Request {
	logged_in?: boolean
  user_id?: number
}

const eventsRouter = express.Router()

// Get All
eventsRouter.get('/', async (req: CustomRequest, res: Response) => {
	const events = await getEvents()
	const filterPublicEvents = events.filter(event => event.private === false)
	
	if(!req.logged_in) return res.send(filterPublicEvents)

	res.send(events)
})

// Get event by userid
eventsRouter.get('/user/:userid', async (req: CustomRequest, res: Response) => {
	const userId = req.params.userid
	const event = await getEventByUserId(userId)

	if(!req.logged_in) return res.status(400).send('private event')
	
	res.send(event)
})

// Get event by id
eventsRouter.get('/event/:id', async (req: CustomRequest, res: Response) => {
	const id = req.params.id
	const event = await getEventById(id)

	if(!req.logged_in) return res.status(400).send('private event')

	res.send(event)
})


export default eventsRouter
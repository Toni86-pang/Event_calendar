import express, {Request, Response}  from 'express'
import { getEvents, getEventByUserId, getEventById, addEvent } from './../dao'
import { validatePostEvent } from '../middleware'

interface CustomRequest extends Request {
	logged_in?: boolean
  user_id?: number
}

interface Events {
	title: string
	private: boolean
}
interface Event {
	title: string
	content: string
	private: boolean
	date_time: string
}


const eventsRouter = express.Router()

// Get All
eventsRouter.get('/', async (req: CustomRequest, res: Response) => {
	const events: Events[] = await getEvents()
	const filterPublicEvents = events.filter(event => event.private === false)
	if(!req.logged_in) return res.send(filterPublicEvents)

	res.send(events)
})

// Get event by userid
eventsRouter.get('/user/:userid', async (req: CustomRequest, res: Response) => {
	const userId = req.params.userid
	const event: Event[] = await getEventByUserId(userId)
	
	if(!event[0]) return res.status(404).send('No such user')

	if(!req.logged_in && event[0].private === true) return res.status(400).send('private event')

	res.send(event)
})

// Get event by id
eventsRouter.get('/event/:id', async (req: CustomRequest, res: Response) => {
	const id = req.params.id
	const event: Event[] = await getEventById(id)

	if(!event[0]) return res.status(404).send('No event')

	if(!req.logged_in && event[0].private === true) return res.status(400).send('private event')

	res.send(event)
})


// Post event
eventsRouter.post('/', validatePostEvent, async (req: CustomRequest, res: Response) => {
	console.log(req.user_id)
	const userId = Number(req.user_id)
	

	const { title, content, isPrivate, date, time } = req.body

	const result = await addEvent(userId, title, content, isPrivate, date, time)
	res.send(result)

})

export default eventsRouter
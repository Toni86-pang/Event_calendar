import express, {Request, Response}  from 'express'
import { getEvents, getEventByUserId, getEventById, addEvent, deleteEventById, deleteCommentByEventId, getInvitationsByUserId, modifyEvent, postInvitation } from './../dao'
import { validatePostEvent } from '../middleware'

interface CustomRequest extends Request {
	logged_in?: boolean
  user_id?: number
}
interface Event {
	event_id: number
	user_id: number
	title: string
	content: string
	private: boolean
	date_time: string
}

const eventsRouter = express.Router()

// Get All events
eventsRouter.get('/', async (req: CustomRequest, res: Response) => {
	const events: Event[] = await getEvents()
	
	const filterPublicEvents = events.filter(event => event.private === false)
  
	if(req.logged_in) return res.send(await getInvitationsByUserId(Number(req.user_id)))
	res.send(filterPublicEvents)
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
	const eventId = req.params.id
	const event: Event[] = await getEventById(eventId)

	if(!event[0]) return res.status(404).send('No event')

	if(!req.logged_in && event[0].private === true) return res.status(400).send('private event')

	res.send(event)
})


// Delete event by id 
eventsRouter.delete('/event/:id', async (req: CustomRequest, res: Response) => {
	
	if(!req.logged_in) return res.status(400).send('Unauthorized delete')
	
	const eventId = req.params.id
	const userId = req.user_id
	
	const event: Event[] = await getEventById(eventId)
	if(!event[0]) return res.status(404).send('No event')
	
	if(event[0].user_id !== userId) return res.status(400).send('Not your event')

	await deleteEventById(eventId)
	await deleteCommentByEventId(Number(eventId))
	
	res.send({data: 'event deleted'})
})


// Post event
eventsRouter.post('/', validatePostEvent, async (req: CustomRequest, res: Response) => {
	console.log(req.user_id)
	const userId = Number(req.user_id)	

	const { title, content, isPrivate, date, time } = req.body

	const result = await addEvent(userId, title, content, isPrivate, date, time)
	const eventId = result[0].event_id
	postInvitation(eventId, userId, userId)
	res.send(result)

})

// Put event
eventsRouter.put('/:id', validatePostEvent, async (req: CustomRequest, res: Response) => {
	console.log(req.user_id)
	const userId = Number(req.user_id)
	
	const { title, content, isPrivate, date, time } = req.body
	const eventId = Number(req.params.id)

	const result = await modifyEvent(eventId, userId, title, content, isPrivate, date, time)
	res.send(result)

})

export default eventsRouter
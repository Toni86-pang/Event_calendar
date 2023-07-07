import express, {Request, Response}  from 'express'
import { getEvents, getEventByUserId, getEventById, addEvent } from './../dao'
import { validatePostEvent } from '../middleware'

interface CustomRequest extends Request {
    logged_in?: boolean
    user_id?: number
}

const eventsRouter = express.Router()


// Get All
eventsRouter.get('/', async (req: CustomRequest, res: Response) => {
	const events = await getEvents()
	res.send(events)
})

// Get event by userid
eventsRouter.get('/user/:userid', async (req: CustomRequest, res: Response) => {
	const userId = req.params.userid

	const event = await getEventByUserId(userId)
	res.send(event)
})

// Get event by id
eventsRouter.get('/event/:id', async (req: CustomRequest, res: Response) => {
	const id = req.params.id
	const event = await getEventById(id)
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
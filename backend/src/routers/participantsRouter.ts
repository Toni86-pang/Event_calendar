import express, { Request, Response } from 'express'
import { getParticipantsByEventId, getEventById, createParticipant } from './../dao'
import { authenticate } from '../middleware'


interface CustomRequest extends Request {
	logged_in?: boolean
	user_id?: number
}
interface Participants {
	participant_id: number
	event_id: number
	user_id: number
	attendance: string[]
	private: boolean
}

const participantsRouter = express.Router()

// Get participants by eventid
participantsRouter.get('/participants/:id', authenticate, async (req: CustomRequest, res: Response) => {
	const eventId = req.params.id

	const event: Participants[] = await getEventById(eventId)

	//  if (!event[0]) {
	//    return res.status(404).send('No event');
	//  }

	//  if (!req.logged_in && event[0].private === true) {
	//    return res.status(400).send('Private event');
	//  }

	const participants = await getParticipantsByEventId(parseInt(eventId, 10))
	event[0].attendance = participants

	res.send(event)
})

participantsRouter.post('/event/:id/attendance', async (req: CustomRequest, res: Response) => {
	const eventId = parseInt(req.params.id, 10)
	const userId = req.body.userId
	const attendance = req.body.attendance

	try {
		const participant = await createParticipant(eventId, userId, attendance)
		res.status(201).json(participant)
	} catch (error) {
		console.error('Error creating participant:', error)
		res.status(500).send('Internal Server Error')
	}
})


// participantsRouter.put('/:id', async (req: CustomRequest, res: Response) => {
// 	console.log(req.user_id)
// 	const userId = Number(req.user_id)

// 	const { title, content, isPrivate, date, time } = req.body
// 	const eventId = Number(req.params.id)

// 	const result = await modifyEvent(eventId, userId, title, content, isPrivate, date, time)
// 	res.send(result)

// })


export default participantsRouter
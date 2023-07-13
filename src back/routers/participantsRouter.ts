import express, { Request, Response } from 'express'
import { getParticipantsByEventId, getEventById, createParticipant, updateParticipant } from './../dao'
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
participantsRouter.get('/:id', authenticate, async (req: CustomRequest, res: Response) => {
	try {
		const eventId = req.params.id

		const event: Participants[] = await getEventById(eventId)
    
		if (!event.length) {
			return res.status(404).json({ error: 'Event not found' })
		}

		const participants = await getParticipantsByEventId(parseInt(eventId, 10))
		const response = {
			event: event[0],
			participants: participants
		}
    
		return res.status(200).json(response)
	} catch (error) {
		console.error('Error retrieving participants:', error)
		return res.status(500).json({ error: 'Internal server error' })
	}
})


participantsRouter.post('/event/:id', async (req: CustomRequest, res: Response) => {
	const eventId = parseInt(req.params.id, 10)
	const userId = req.body.userId
	const attendance = req.body.attendance
  
	try {
		// Validate input data
		if (!eventId || !attendance) {
			res.status(400).send('Invalid input data')
			return
		}
  
		const participant = await createParticipant(eventId, userId, attendance)
		res.status(201).json(participant)
	} catch (error) {
		console.error('Error creating participant:', error)
		res.status(500).send('Internal Server Error')
	}
})


participantsRouter.put('/event/:id', async (req: CustomRequest, res: Response) => {
	const eventId = parseInt(req.params.id, 10)
	const userId = req.body.userId
	const attendance = req.body.attendance
	
	try {
		// Validate input data
		if (!eventId || !attendance) {
			res.status(400).send('Invalid input data')
			return
		}
		const participant = await updateParticipant(eventId, userId, attendance)
		res.status(200).json(participant)
	} catch (error) {
		console.error('Error updating participant:', error)
		res.status(500).send('Internal Server Error')
	}
})



export default participantsRouter
import express, {Request, Response}  from 'express'
import { postInvitation, getInvitationsByUserId } from '../dao'



interface CustomRequest extends Request {
	logged_in?: boolean
  user_id?: number
}

interface Invitation {
  eventId: number
  userRecId: number
}

const invitationsRouter = express.Router()

// Get invitation by userId
invitationsRouter.get('/invitations/:userId', async (req: CustomRequest, res: Response) => {
	const userId = req.params.userid
	const invitations: Invitation[] = await getInvitationsByUserId(Number(userId))

	res.send(invitations)
})

// Post invitation
invitationsRouter.post('/', async (req: CustomRequest, res: Response) => {
	const userCallId = Number(req.user_id)
	const { eventId, userRecId }: Invitation = req.body

	await postInvitation(eventId, userCallId, userRecId)

	res.send('invite sent')
})

export default invitationsRouter 
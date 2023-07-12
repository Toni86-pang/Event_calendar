import express, {Request, Response}  from 'express'
import { getCommentByEventId, postComment } from '../dao'

interface CustomRequest extends Request {
	logged_in?: boolean
  user_id?: number
}

interface Comment {
	event_id: number
	users_id: number
	comment: string
	commentdate: string
}

const commentsRouter = express.Router()

// Post comment
commentsRouter.post('/', async (req: CustomRequest, res: Response) => {
	
	if(!req.body) return res.status(400).send('no body')
	if(req.body.comment === '') return res.status(400).send('no text')

	const user_id = req.logged_in ? req.user_id : null 

	await postComment(req.body.eventId, user_id, req.body.comment)
	res.send('comment posted')
})


// Get comment by event id
commentsRouter.get('/:eventId', async (req: CustomRequest, res: Response) => {
	const commentId = req.params.eventId
	const comment: Comment[] = await getCommentByEventId(commentId)

	if(!comment[0]) return res.status(200).json({})
	res.send(comment)
})




export default commentsRouter
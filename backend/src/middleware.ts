import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getUserById } from './dao'

interface CustomRequest extends Request {
	logged_in?: boolean
	user_id?: number
}


export const unknownEndpoint = (_req: Request, res: Response) => {
	res.status(404).send({ error: 'Page not found!' })
}


export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
	const auth = req.get('Authorization')
	if (!auth?.startsWith('Bearer ')) {
		req.logged_in = false
		return next()		
	}
	
	const token = auth.substring(7)
	const secret = process.env.SECRET ?? ''
	try {
		const decodedToken = jwt.verify(token, secret)
		if (typeof decodedToken !== 'string') {
			req.user_id = decodedToken.id
			
			const user = await getUserById(decodedToken.id)
			if (!user) {
				throw ('Invalid user')
			}
			req.logged_in = true
		}
		next()
	} catch (error) {
		return res.status(401).send('Invalid token')
	}
}

export const validatePostEvent = async (req: CustomRequest, res: Response, next: NextFunction) => {
	const user_id = req.user_id
	if(!req.logged_in || !user_id) {
		res.status(401).send()
	}
	const { title, content, isPrivate, date, time } = req.body
	if (!title || !content || isPrivate===undefined || !date || !time) {
		return res.status(400).send('Invalid')
	}
	
	next()

}


export const validateUsername = async (req: CustomRequest, res: Response, next: NextFunction) => {
	const { username } = req.body
	if (!username || typeof username !== 'string') {
		return res.status(400).send('Invalid username')
	}

	next()
}


export const validatePassword = async (req: CustomRequest, res: Response, next: NextFunction) => {
	const { password } = req.body

	if (!password || password.length < 5) {
		return res.status(400).send('Invalid password')
	}
	next()
}

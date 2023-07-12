import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import { addUser, getUserByUsername, getUsers } from '../dao'
import { authenticate } from '../middleware'

interface CustomRequest extends Request {
	logged_in?: boolean
	user_id?: number
}

const usersRouter = express.Router()

const secret = process.env.SECRET
if (secret === undefined) throw new Error('Missing SECRET environment variable')

// Register a new user

usersRouter.post('/register', async (req: Request, res: Response) => {
	const { username, password } = req.body
	if (!username || !password) {
		return res.status(400).send()
	}

	// Check if user exist

	const existingUser = await getUserByUsername(username)
	if (existingUser) {
		return res.status(409).send('Username already exists')
	}

	const password_hash = await argon2.hash(password)
	const storedUser = await addUser(username, password_hash)
	const id = storedUser.user_id ?? ''
	const token = jwt.sign({ username, id }, secret)
	console.log('token: ', token)
	res.status(200).json({ token, success: true })
})

// Login user

usersRouter.post('/login', async (req: Request, res: Response) => {
	const { username, password } = req.body
	console.log('req', req.body)
	const existingUser = await getUserByUsername(username)
	if (existingUser === undefined) {
		return res.status(401).send('Invalid username or password')
	}

	const isValidPassword = await argon2.verify(existingUser.password_hash, password)
	if (!isValidPassword) {
		return res.status(401).send('Invalid username or password')
	}
	const id = existingUser.user_id

	const token = jwt.sign({ username, id }, secret)
	res.status(200).json(token)

})

// Get all users
usersRouter.get('/', async (req: CustomRequest, res: Response) => {
	const user = await getUsers()
	res.send(user)
})

export default usersRouter

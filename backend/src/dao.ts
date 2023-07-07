import { executeQuery } from './db'
import query from './query'

interface User {
    user_id?: number
    username: string,
    password_hash: string
}

// User
export const addUser = async (username: string, password_hash: string) => {
	const createUser = query.addUser
	const params = [username, password_hash]
	const result = await executeQuery(createUser, params)
	const user: User = { username, password_hash }
	const id = result.rows[0].user_id
	user.user_id = id
	return user
}

export const getUserByUsername = async (username: string) => {

	try {
		const result = await executeQuery(query.checkIfUsernameExist, [username])
		return result.rows[0]
	} catch (error) {
		console.error('Error executing query:', error)
		throw error
	}
}

export const getUserById = async (user_id: number) => {

	try {
		const result = await executeQuery(query.checkIfUserIdExist, [user_id])
		return result.rows[0]
	} catch (error) {
		console.error('Error executing query:', error)
		throw error
	}
}


// Events
export const getEvents = async () => {
	const result = await executeQuery(query.allEvents)
	return result.rows
}

export const getEventByUserId = async (userId: string) => {
	const params = [userId]
	const result = await executeQuery(query.eventsByUserId, params)
	return result.rows
}

export const getEventById = async (id: string) => {
	const params = [id]
	const result = await executeQuery(query.eventsById, params)
	return result.rows
}

export const deleteEventById = async (id: string) => {
	const params = [id]
	await executeQuery(query.deleteEventById, params)
	return 
}


// comments
export const getCommentByEventId = async (id: string) => {
	const params = [id]
	const result = await executeQuery(query.getCommentByEventId, params)
	return result.rows
}

export const postComment = async (event_id: string, user_id: number | null | undefined, comment: string) => {
	const params = [event_id, user_id, comment]
	await executeQuery(query.postComment, params)
	return
}

export const deleteCommentByEventId = async (event_id: string) => {
	const params = [event_id]
	await executeQuery(query.deleteCommentsInEvent, params)
	return
}

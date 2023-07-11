import { executeQuery } from './db'
import query from './query'

interface User {
	user_id?: number
	username: string,
	password_hash: string
}

// User
export const addUser = async (username: string, password_hash: string) => {
	const params = [username, password_hash]
	const result = await executeQuery(query.addUser, params)
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

export const getUserById = async (userId: number) => {

	try {
		const result = await executeQuery(query.checkIfUserIdExist, [userId])
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


export const addEvent = async (userId: number, title: string, content: string, isPrivate: boolean, date: string, time: string) => {
	const formattedDate = date.substring(6) + '-' + date.substring(3,5) + '-' + date.substring(0,2) 
	const dateTime = `${formattedDate} ${time}`
	console.log(dateTime)
	const params = [userId, title, content, isPrivate, dateTime]
	const result = await executeQuery(query.addEvent, params)
	return result.rows
}

export const modifyEvent = async (eventId: number, userId: number, title: string, content: string, isPrivate: boolean, date: string, time: string) => {
	const formattedDate = date.substring(6) + '-' + date.substring(3,5) + '-' + date.substring(0,2)
	const dateTime = `${date} ${time}`
	console.log(date, formattedDate)
	console.log(dateTime)
	const params = [eventId, title, content, isPrivate, dateTime]
	const result = await executeQuery(query.modifyEvent, params)
	return result.rows
}



// Comments
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



// Invitations
export const postInvitation = async (eventId: number, userCallId: number, userRecId: number) => {

	const params = [eventId, userCallId, userRecId]
	await executeQuery(query.postInvitation, params)
}

export const getInvitationsByUserId = async (userRecId: number) => {

	const params = [userRecId]
	const invitations = await executeQuery(query.getInvitationsByUserId, params)

	return invitations.rows
}

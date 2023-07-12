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

export const getUsers = async () => {
	const result = await executeQuery(query.getAllUsers)
	return result.rows
}

export const deleteUserById = async (userId: string) => {
	const params = [userId]
	await executeQuery(query.deleteUserById, params)
	return
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

export const deleteEventsByUserId = async (id: string) => {
	const params = [id]
	await executeQuery(query.deleteEventsByUserId, params)
	return
}


export const addEvent = async (userId: number, title: string, content: string, isPrivate: boolean, date: string, time: string) => {
	const dateTime = `${date} ${time}`
	const params = [userId, title, content, isPrivate, dateTime]
	const result = await executeQuery(query.addEvent, params)
	return result.rows
}

export const modifyEvent = async (eventId: number, userId: number, title: string, content: string, isPrivate: boolean, date: string, time: string) => {
	const dateTime = `${date} ${time}`
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

export const deleteCommentByEventId = async (event_id: number) => {
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
export const deleteEventInvitations = async (eventId: number) => {
	const params = [eventId]
	await executeQuery(query.deleteEventInvitations, params)
	return 
}



// participants
export const deleteEventParticipants = async (eventId: number) => {
	const params = [eventId]
	await executeQuery(query.deleteEventParticipants, params)
	return 
}

export const getParticipantsByEventId = async (eventId: number) => {
	try {
		const result = await executeQuery(
			query.participantsByEventId,
			[eventId]
		)
		return result.rows
	} catch (error) {
		console.error('Error executing query:', error)
		throw error
	}
}

export const createParticipant = async (eventId: number, userId: number, attendance: string) => {
	try {
		const result = await executeQuery(query.postparticipation, [eventId, userId, attendance])
		return result.rows[0]
	} catch (error) {
		console.error('Error executing query:', error)
		throw error
	}
}


export const updateParticipant = async (eventId: number, userId: number, attendance: string) => {
	try {
		const result = await executeQuery(
			query.updateParticipant,
			[attendance, eventId, userId]
		)
		return result.rows[0]
	} catch (error) {
		console.error('Error executing query:', error)
		throw error
	}
}
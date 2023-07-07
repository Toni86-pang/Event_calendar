import { executeQuery } from './db'
import query from './query'

interface User {
	user_id?: number
	username: string,
	password_hash: string
}


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

export const getUserById = async (userId: number) => {

	try {
		const result = await executeQuery(query.checkIfUserIdExist, [userId])
		return result.rows[0]
	} catch (error) {
		console.error('Error executing query:', error)
		throw error
	}
}

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

export const addEvent = async (userId: number, title: string, content: string, isPrivate: boolean, date: string, time: string) => {
	const formattedDate = date.substring(6) + '-' + date.substring(3,5) + '-' + date.substring(0,2) 
	const dateTime = `${formattedDate} ${time}`
	const params = [userId, title, content, isPrivate, dateTime]
	const result = await executeQuery(query.addEvent, params)
	return result.rows
}
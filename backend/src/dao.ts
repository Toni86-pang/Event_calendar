import { executeQuery } from './db'
import query from './query'

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

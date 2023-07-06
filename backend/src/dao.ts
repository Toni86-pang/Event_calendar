import { executeQuery } from './db'

export const getEvents = async () => {
    const query = 'SELECT title FROM events'
    const result = await executeQuery(query)
    return result.rows
}
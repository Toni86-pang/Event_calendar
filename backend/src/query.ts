// Users

const addUser = 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING user_id;'
const checkIfUsernameExist = 'SELECT * FROM users WHERE username = $1;'
const checkIfUserIdExist = 'SELECT * FROM users WHERE user_id = $1'


//Events
const allEvents = 'SELECT title FROM events'
const eventsByUserId = 'SELECT title, content, private, date_time FROM events WHERE event_id = $1'
const eventsById = 'SELECT title, content, private, date_time FROM events WHERE user_id = $1'
const addEvent = 'INSERT INTO events (user_id, title, content, private, date_time) VALUES ($1, $2, $3, $4, $5) RETURNING *;'

export default {
	addUser,
	checkIfUsernameExist,
	checkIfUserIdExist,
	allEvents,
	eventsById,
	eventsByUserId,
	addEvent
}

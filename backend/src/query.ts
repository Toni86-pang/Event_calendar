// Users
const addUser = 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING user_id;'
const checkIfUsernameExist = 'SELECT * FROM users WHERE username = $1;'
const checkIfUserIdExist = 'SELECT * FROM users WHERE user_id = $1'


//Events
const allEvents = 'SELECT title, private FROM events'
const eventsByUserId = 'SELECT title, content, private, date_time FROM events WHERE user_id = $1'
const eventsById = 'SELECT title, content, private, date_time FROM events WHERE event_id = $1'

export default {
	addUser,
	checkIfUsernameExist,
	checkIfUserIdExist,allEvents, eventsById, eventsByUserId
}

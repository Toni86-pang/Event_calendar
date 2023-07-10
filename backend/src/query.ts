// Users
const addUser = 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING user_id;'
const checkIfUsernameExist = 'SELECT * FROM users WHERE username = $1;'
const checkIfUserIdExist = 'SELECT * FROM users WHERE user_id = $1;'


// Events
const allEvents = 'SELECT title, private FROM events;'
const eventsByUserId = 'SELECT title, content, private, date_time FROM events WHERE user_id = $1;'
const eventsById = 'SELECT user_id, title, content, private, date_time FROM events WHERE event_id = $1;'
const deleteEventById = 'DELETE FROM events WHERE event_id = $1;'
const deleteCommentsInEvent = 'DELETE FROM comments WHERE event_id = $1'
const addEvent = 'INSERT INTO events (user_id, title, content, private, date_time) VALUES ($1, $2, $3, $4, $5) RETURNING *;'

// Comments
const postComment = 'INSERT INTO comments (event_id, user_id, comment, commentdate) VALUES ($1, $2, $3, current_timestamp);'
const getCommentByEventId = 'SELECT user_id, comment, commentdate FROM comments WHERE event_id = $1;'



export default {
	addUser,
	checkIfUsernameExist,
	checkIfUserIdExist,
	allEvents, 
	eventsById, 
	eventsByUserId,
	deleteEventById,
	deleteCommentsInEvent,
	getCommentByEventId,
	postComment,
	addEvent
}

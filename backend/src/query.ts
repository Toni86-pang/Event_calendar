// Users
const addUser = 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING user_id;'
const checkIfUsernameExist = 'SELECT * FROM users WHERE username = $1;'
const checkIfUserIdExist = 'SELECT * FROM users WHERE user_id = $1;'
const getAllUsers = 'SELECT user_id, username FROM users;'

// Events
const allEvents = 'SELECT event_id, title, private, date_time FROM events ORDER BY date_time;'
const eventsByUserId = 'SELECT event_id, title, content, private, date_time FROM events WHERE user_id = $1;'
const eventsById = 'SELECT event_id, user_id, title, content, private, date_time FROM events WHERE event_id = $1;'
const deleteEventById = 'DELETE FROM events WHERE event_id = $1;'
const deleteCommentsInEvent = 'DELETE FROM comments WHERE event_id = $1'
const addEvent = 'INSERT INTO events (user_id, title, content, private, date_time) VALUES ($1, $2, $3, $4, $5) RETURNING *;'
const modifyEvent = 'UPDATE events SET title = $2, content = $3, private = $4, date_time = $5 WHERE event_id = $1'

// Comments
const postComment = 'INSERT INTO comments (event_id, user_id, comment, commentdate) VALUES ($1, $2, $3, current_timestamp);'
const getCommentByEventId = 'SELECT user_id, comment, commentdate FROM comments WHERE event_id = $1;'

// Invitations

const postInvitation = 'INSERT INTO invitations (event_id, user_call_id, user_rec_id, inv_date) VALUES ($1, $2, $3, current_timestamp);'
const getInvitationsByUserId = `
	SELECT DISTINCT events.*
	FROM events
	LEFT JOIN invitations ON invitations.event_id = events.event_id
	WHERE events.private = false OR invitations.user_rec_id = $1;`

//participants
const participantsByEventId = ' SELECT participant_id, attendance FROM participants WHERE event_id = $1;'
const postparticipation = 'INSERT INTO participants (event_id, user_id, attendance)VALUES ($1, $2, $3)RETURNING *;'
const putparticipation = 'UPADTE participants SET attendace = $2 WHERE participant_id = $1 RETURNING *; '

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
	addEvent,
	postInvitation,
	modifyEvent,
	getInvitationsByUserId,
	participantsByEventId,
	getAllUsers,
	postparticipation,
	putparticipation
}

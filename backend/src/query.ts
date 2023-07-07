

//Events
const allEvents = 'SELECT title FROM events'
const eventsByUserId = 'SELECT title, content, private, date_time FROM events WHERE event_id = $1'
const eventsById = 'SELECT title, content, private, date_time FROM events WHERE user_id = $1'



export default {allEvents, eventsById, eventsByUserId}
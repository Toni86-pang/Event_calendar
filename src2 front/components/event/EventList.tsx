import { useLocation, Link, Outlet } from 'react-router-dom'
import { useState, ChangeEvent, useEffect } from 'react'
import './Events.css'

interface Event {
	event_id?: string
	title: string
	content?: string
	private?: boolean
	date_time: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loader({ params }: any) {

	return params
}

const EventList = () => {

	let userId: number | null

	try {
		userId = useLocation().state.userId

	} catch {
		userId = null
	}

	const [search, setSearch] = useState('')
	const [events, setEvents] = useState<Event[]>([])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	useEffect(() => {
		const getEvents = async () => {
			try {
				let response: Response
				if (userId) {
					console.log('eventlist userId: ', userId)
					response = await fetch('/api/events', {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					})
				} else {
					response = await fetch('/api/events')
				}

				const events = await response.json() as Array<Event>
				setEvents(events)

			} catch (error) {
				console.log('Error fetching event data:', error)
			}
		}

		getEvents()

	}, [])

	let eventList

	if (search.length > 0) {


		const filteredEvents = events.filter((event) =>
			event.title.toLowerCase().includes(search.toLowerCase())
		)
		eventList = filteredEvents
	} else {
		eventList = events
	}

	const formatDateTime = (dateTime: string): string => {
		const date = new Date(dateTime)
		const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
		const hours = date.getHours()
		const minutes = date.getMinutes().toString().padStart(2, '0')
		const formattedTime = `${hours}:${minutes}`
		return formattedDate + ' ' + formattedTime
	}
	console.log('eventlist userId:', userId)
	const eventNavigation = eventList.map((event, i) => {
		const formattedDateTime = formatDateTime(event.date_time)

		return (
			<li key={'event' + event.event_id + i}>
				<Link to={'event/' + event.event_id} state={{ userId }}>
					<p>
						{event.title}: {formattedDateTime}
					</p>
				</Link>
			</li>
		)
	})

	return (
		<>
			<h1>The Event Calendar</h1>
			<div className='eventBrowser'>
				<div className='leftColumn'>
					<input onChange={handleChange} type='text'></input>
					<ul className='eventList'>
						{eventNavigation}
					</ul>
				</div>
				<div className='eventInfo'>
					<Outlet />
				</div>
			</div>
		</>
	)
}
export default EventList 

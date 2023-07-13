import { Link, Outlet } from 'react-router-dom'
import { useState, ChangeEvent, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './Events.css'

interface Event {
	event_id?: string
	user_id?: number
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


	const [search, setSearch] = useState('')
	const [events, setEvents] = useState<Event[]>([])
	const [allEvents, setAllEvents] = useState<Event[]>([])
	const [userId] = useState<number|undefined>(Number(localStorage.getItem('userId')))

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	useEffect(() => {
		const getEvents = async () => {

			const headers = new Headers()
			if (localStorage.getItem('token')) {
				headers.append('Content-type', 'application/json')
				headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
			}
			else {
				headers.append('Content-type', 'application/json')
			}

			try {
				
				console.log('eventlist userId: ', userId)
				const response = await fetch('/api/events', {
					headers: headers
				})
				

				const events = await response.json() as Array<Event>
				setEvents(events)
				setAllEvents(events)
				
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
				<Link className='eventLink' to={'event/' + event.event_id} state={{userId}}>
					<p className='linkDate'>
						{formattedDateTime}
					</p>
					<p className='linkTitle'>
						{event.title}
					</p>
				</Link>
			</li>
		)
	})

	const filterMyEvents = allEvents.filter(event => event.user_id === userId)
	const myEvents = filterMyEvents.map( event => {
		const formattedDateTime = formatDateTime(event.date_time)
		const keyId = nanoid()

		return (
			<li key={keyId}>
				<Link className='eventLink' to={'event/' + event.event_id } state={{userId}}>
					<p className='linkDate'>
						{formattedDateTime}
					</p>
					<p className='linkTitle'>
						{event.title}
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
					<div className='eventsWrapper'>
						<input onChange={handleChange} type='text'></input>
						{myEvents.length > 0 ? <>
							<h3>My events</h3>
							<ul className='myEvents'>
								{myEvents} 
							</ul> 
						</>
							: <></>}
						<h3>Upcoming events</h3>
						<ul className='eventList'>
							{eventNavigation}
						</ul>
					</div>
				</div>
				<div className='eventInfo'>
					<Outlet />
				</div>
			</div>
		</>
	)
}
export default EventList 

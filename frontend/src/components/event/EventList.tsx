import { Link, Outlet } from 'react-router-dom'
import { useState, ChangeEvent, useEffect } from 'react'

interface Event {
    event_id?: string
    title: string
    content?: string
    isPrivate?: boolean
    date_time: string
}

export function loader({ params }: any) {

    return params
}

const EventList = () => {

    const [search, setSearch] = useState('')
    const [events, setEvents] = useState<Event[]>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const getEvents = async () => {
            try {

                const response = await fetch('/api/events')
                const events = await response.json() as Array<Event>
                setEvents(events)

            } catch (error) {
                console.log('Error fetching event data:', error);
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

    const eventNavigation = eventList.map((event, i) => (
        <li key={'event' + event.event_id + i}>
            <Link to={'event/' + event.event_id}>
                <p>
                    {event.title}: {event.date_time}
                </p>
            </Link>
        </li>
    ))

    return (
        <>
            <h1>The Event Calendar</h1>
            <div className="eventBrowser">
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

import { useLoaderData } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

interface Event {
    event_id?: string
    title: string
    content: string
    isPrivate: boolean
    date_time:string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loader({ params }: any) {

	return params.id
}

export default function Event() {

	const id = useLoaderData() as string
	const [currentEvent, setCurrentEvent] = useState<Event | null>(null)

	useEffect(() => {
		const getEventInfo = async () => {
			try {

            const response = await fetch('api/events/event/' + id)
            const event = await response.json() as Event[]
            if (event.length > 0) {
                setCurrentEvent(event[0])
                console.log("All works")
              } else {
                setCurrentEvent(null)
              }
            } catch (error) {
              console.log('Error fetching event data:', error)
            }
          }

		getEventInfo()

	}, [id])

	return (

		<div className='events'>
			<h3>
                Title: {currentEvent && currentEvent.title}
			</h3>
			<p>Content: {currentEvent && currentEvent.content}</p>
			<p>Private: {currentEvent && currentEvent.isPrivate}</p>
			<p>Date and time: {currentEvent && currentEvent.date_time}</p>
		</div>
	)
}
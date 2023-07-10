import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Event {
    id?: string
    title: string
    content: string
    isPrivate: boolean
    date_time:string
    participants: []
}

export function loader({ params }: any) {

    return params.id
}

export default function Events() {

    const id = useLoaderData() as string
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null)

    useEffect(() => {
        const getEventInfo = async () => {
            try {

            const response = await fetch('/events/event/' + id)
            const event = await response.json() as Event[]
            if (event.length > 0) {
                setCurrentEvent(event[0])
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
            <p>Participants: {currentEvent && currentEvent.participants}</p>
        </div>
    )
}
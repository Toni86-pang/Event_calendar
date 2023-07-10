import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Event {
    id?: number
    title: string
    content: string
    isPrivate: boolean
    date_time:string
}

export function loader({ params }: { params: any }) {
  const id = Number(params.id)
  
  if (id === undefined) {
      throw new Response("Not Found", { status: 404 })
  }
  return id
}

export default function Event() {

    const id = useLoaderData() as string
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null)

    useEffect(() => {
        const getEventInfo = async () => {
            try {

            const response = await fetch('api/events/event' + id)
            const event = await response.json() as Event[]
            console.log('event')
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
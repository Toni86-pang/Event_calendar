import { useEffect, useState } from "react"

interface Events {
    id: number
    title: string
}

function App() {
    const [events, setEvents] = useState<Array<Events>>([])

    useEffect(() => {
        getEvents()
    }, [])

    const getEvents = async () => {
        const response = await fetch('/events')
        const result = await response.json()
        setEvents(result)
    }

    return (
        <div className='App'>
            {events.map(event => {
                return <div key={event.id}>{event.title}</div>
            })}
        </div>
    )
}

export default App

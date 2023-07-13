/* eslint-disable indent */
import { useLoaderData, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Comments from '../Comments/Comments'

interface Event {
	event_id?: string
	title: string
	content: string
	private: boolean
	date_time: string
	user_id: number
	attendanceCount?: {
		[key: string]: number
		yesCount: number
		noCount: number
		maybeCount: number
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loader({ params }: any) {

	return params.id
}

export default function Event() {
	const id = useLoaderData() as string
	const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
	const [userId, setUserId] = useState<number|undefined>(Number(localStorage.getItem('userId')))
	const [attendance, setAttendance] = useState('')
	const [submittedAttendance, setSubmittedAttendance] = useState(false)
  
	useEffect(() => {
		const getEventInfo = async () => {
			try {
				let response: Response
				if (userId) {
					response = await fetch('/api/events/event/' + id, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					})
				} else {
					response =  await fetch('/api/events/event/' + id)
				}				
				const event = await response.json() as Event[]
				if (event.length > 0) {
					setCurrentEvent(event[0])
					console.log('All works')
				} else {
					setCurrentEvent(null)
				}
			} catch (error) {
				console.log('Error fetching event data:', error)
			}
			getParticipants()
		}



		const getParticipants = async () => {
			try {
				const participantsResponse = await fetch('/api/participants/' + id)
				const data = await participantsResponse.json()

				const participants = data.participants // Access the participants array

				console.log('Participants:', participants)

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const yesCount = participants.filter((participant: any) => participant.attendance === 'yes').length
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const noCount = participants.filter((participant: any) => participant.attendance === 'no').length
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const maybeCount = participants.filter((participant: any) => participant.attendance === 'maybe').length

				setCurrentEvent(prevEvent => ({
					...prevEvent!,
					attendanceCount: {
						yesCount,
						noCount,
						maybeCount
					}
				}))
			} catch (error) {
				console.log('Error fetching participants:', error)
			}
			
		}
		getEventInfo()
		setUserId(Number(localStorage.getItem('userId')))
	}, [id])

	
	const handleAttendanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!submittedAttendance) {
		setAttendance(event.target.value)
		}
	}
	
	const handleAttendance = async (attendance: string) => {
		if (!submittedAttendance) {
		try {
			const body = JSON.stringify({ attendance })
			const headers = new Headers()
			headers.append('Content-Type', 'application/json')
	
			await fetch(`/api/participants/event/${id}`, {
			method: 'POST',
			body,
			headers,
			})
	
			setCurrentEvent((prevEvent) => ({
			...prevEvent!,
			attendanceCount: {
				...prevEvent!.attendanceCount!,
				[attendance]: prevEvent!.attendanceCount![attendance] + 1,
			},
			}))
	
			setSubmittedAttendance(true)
			console.log('Attendance updated successfully')
		} catch (error) {
			console.log('Error updating attendance:', error)
		}
		}
	}

	const formatDateTime = (dateTime: string): string => {
		const date = new Date(dateTime)
		const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
		const hours = date.getHours()
		const minutes = date.getMinutes().toString().padStart(2, '0')
		const formattedTime = `${hours}:${minutes}`
		return formattedDate + ' ' + formattedTime
	}
	
	return (

		<div className='events'>
			<div className='details'>
			<h2>{currentEvent && currentEvent.title}</h2>
			<p>{currentEvent && formatDateTime(currentEvent.date_time)}</p>
			<p>{currentEvent?.content}</p>
			{currentEvent?.user_id === userId ? <Link to={'/events/create'} state={{ eventId:currentEvent?.event_id }}><button>Edit event</button></Link> : ''}
			<p>{currentEvent && (currentEvent.private ? 'Private' : 'Public')} event</p>
			</div>

			<div className='checkboxes'>
        <h3>Attendance</h3>
        <div className='attendanceOptions'>
          <label>
            <input
              type='checkbox'
              value='yes'
              checked={attendance === 'yes'}
              onChange={handleAttendanceChange}
              disabled={attendance !== ''}
            />
            Yes
          </label>
          <label>
            <input
              type='checkbox'
              value='no'
              checked={attendance === 'no'}
              onChange={handleAttendanceChange}
              disabled={attendance !== ''}
            />
            No
          </label>
          <label>
            <input
              type='checkbox'
              value='maybe'
              checked={attendance === 'maybe'}
              onChange={handleAttendanceChange}
              disabled={attendance !== ''}
            />
            Maybe
          </label>
        </div>
        <button onClick={() => handleAttendance(attendance)} disabled={attendance === ''}>Submit Attendance</button>
		</div>
			<p>Number of participants saying yes: {currentEvent && currentEvent.attendanceCount?.yesCount}</p>
			<p>Number of participants saying no: {currentEvent && currentEvent.attendanceCount?.noCount}</p>
			<p>Number of participants saying maybe: {currentEvent && currentEvent.attendanceCount?.maybeCount}</p>	
			<Comments />

		</div>
	)
}

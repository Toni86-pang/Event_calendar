/* eslint-disable indent */
import { useLoaderData, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Comments from '../commentsi/Comments'

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
			<h2>{currentEvent && currentEvent.title}</h2>
			<p>{currentEvent && formatDateTime(currentEvent.date_time)}</p>
			<p>{currentEvent?.content}</p>
			{currentEvent?.user_id === userId ? <Link to={'/events/create'} state={{ eventId:currentEvent?.event_id }}><button>Edit event</button></Link> : ''}
			<p>{currentEvent && (currentEvent.private ? 'Private' : 'Public')} event</p>
			<p>Number of participants saying yes: {currentEvent && currentEvent.attendanceCount?.yesCount}</p>
			<p>Number of participants saying no: {currentEvent && currentEvent.attendanceCount?.noCount}</p>
			<p>Number of participants saying maybe: {currentEvent && currentEvent.attendanceCount?.maybeCount}</p>
			<Comments />

		</div>

	)
}

/*  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!submittedAttendance) {
		  setAttendance(event.target.value);
		}
	  };
	  const handleUpdateAttendance = async () => {
		try {
		  const body = JSON.stringify({ attendance: selectedAttendance });
		  const headers = new Headers();
		  headers.append('Content-Type', 'application/json');
	  
		  if (attendance !== '') {
			// If currentAttendance exists, make a PUT request to update the attendance
			await fetch(`/api/participants/event/${id}`, {
			  method: 'PUT',
			  body,
			  headers,
			});
	  
			setCurrentEvent((prevEvent) => ({
			  ...prevEvent!,
			  attendanceCount: {
				...prevEvent!.attendanceCount!,
				[attendance]: prevEvent!.attendanceCount![attendance] - 1,
				[selectedAttendance]: prevEvent!.attendanceCount![selectedAttendance] + 1,
			  },
			}));
		  } else {
			// If currentAttendance doesn't exist, make a POST request to create a new participant
			await fetch(`/api/participants/event/${id}`, {
			  method: 'POST',
			  body,
			  headers,
			});
	  
			setCurrentEvent((prevEvent) => ({
			  ...prevEvent!,
			  attendanceCount: {
				...prevEvent!.attendanceCount!,
				[selectedAttendance]: prevEvent!.attendanceCount![selectedAttendance] + 1,
			  },
			}));
		  }
	  
		  setSubmittedAttendance(true);
		  console.log('Attendance updated successfully');
		} catch (error) {
		  console.log('Error updating attendance:', error);
		}
	  };*/
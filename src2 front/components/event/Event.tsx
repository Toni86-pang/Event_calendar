/* eslint-disable indent */
import { useLocation, useLoaderData, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

interface Event {
	event_id?: string
	title: string
	content: string
	private: boolean
	date_time: string
	user_id: number
	attendanceCount?: {
	[key: string]: number;
		yesCount: number
		noCount: number
		maybeCount: number
	}
}

interface Comment {
	user_id: number
	comment: string
	commentdate: string

}

interface User {
	user_id: number
	username: string
}

interface User {
	user_id: number
	username: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loader({ params }: any) {

	return params.id
}

export default function Event() {
	const id = useLoaderData() as string
	const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
	const [eventComments, setEventComments] = useState<Comment[] | null>(null)
	const [comment, setComment] = useState('')
	const [users, setUsers] = useState<Array<User> | null>(null)

	useEffect(() => {
		const getUsers = async () => {
			try {

				const response = await fetch('/api/users/')

				const users = await response.json()
				if (users.length > 0) {
					setUsers(users)
					console.log('users fetched', users)
				} else {
					setUsers(null)
					console.log('No Comments', users)
				}
			} catch (error) {
				console.log('Error fetching comments:', error)
			}
		}

		getUsers()
	}, [])

useEffect(() => {
    const getEventInfo = async () => {
      try {
        const eventResponse = await fetch('/api/events/event/' + id)
        const event = await eventResponse.json() as Event[]
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
	  
		  const yesCount = participants.filter((participant: any) => participant.attendance === 'yes').length
		  const noCount = participants.filter((participant: any) => participant.attendance === 'no').length
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
		getEventInfo()
	}, [id, userId])

	const getComments = async () => {
		try {
			const response = await fetch('/api/comments/' + id)
			const comments = await response.json()
			if (comments.length > 0) {
				setEventComments(comments)
				console.log('Comments fetched', comments)
			} else {
				setEventComments(null)
				console.log('No Comments', comments)
			}
		} catch (error) {
			console.log('Error fetching comments:', error)
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


	const renderComments = eventComments?.map(comment => {

		const findUserName = users?.find(user => user.user_id === comment.user_id)

		const keyId = nanoid()
		return (<li className='commentItem' key={keyId}>
			<p>{comment.comment}</p>
			<p>posted by: {findUserName?.username ? <span className='commenterName'>{findUserName?.username} </span>
				: <span className='commenterName'>Anon </span>}
				{formatDateTime(comment.commentdate)}</p>
		</li>
		)
	})


	const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComment(event.target.value)
	}
	const handlePostComment = async () => {
		console.log('posted!')
		const body = JSON.stringify({ eventId: id, comment: comment })

		const headers = new Headers()
		if (localStorage.getItem('token')) {
			headers.append('Content-type', 'application/json')
			headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
		}
		else {
			headers.append('Content-type', 'application/json')
		}
		console.log(headers, comment, id, body)

		try {
			await fetch('/api/comments/', {
				method: 'POST',
				body: body,
				headers: headers
			})
		} catch (error) {
			console.log('Error posting comment:', error)
		}
		setComment('')

		getComments()

	}
	
	return (

		<div className='events'>
			<h2>
        {currentEvent && currentEvent.title}
			</h2>
			<p>{currentEvent && currentEvent.content}</p>
			<p>{currentEvent && (currentEvent.private ? 'Private' : 'Public')} event</p>
			<p>Date and time: {currentEvent && formatDateTime(currentEvent.date_time)}</p>
			<p>Number of participants saying yes: {currentEvent && currentEvent.attendanceCount?.yesCount}</p>
			<p>Number of participants saying no: {currentEvent && currentEvent.attendanceCount?.noCount}</p>
			<p>Number of participants saying maybe: {currentEvent && currentEvent.attendanceCount?.maybeCount}</p>
			<h3>Comment Section</h3>
			<ul className='commentWrapper'>
				<div className='commentInputWrap'>
					<input className='commentInput' type='text' value={comment} onChange={handleComment} />
					<button className='commentBtn' onClick={handlePostComment}>Add Comment</button>
				</div>
				{renderComments}
			</ul>
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
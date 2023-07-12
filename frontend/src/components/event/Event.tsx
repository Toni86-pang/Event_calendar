/* eslint-disable indent */
import {useLocation, useLoaderData, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

interface Event {
	event_id?: string
	title: string
	content: string
	isPrivate: boolean
	date_time: string
	user_id: number
	participantCount: number
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
	let userId: number|null
	
	if(useLocation().state) {
		userId = useLocation().state.userId
	} else {
		userId = null
	}

	console.log(userId)

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
					const updatedEvent = { ...event[0] }
					setCurrentEvent(updatedEvent)
					console.log('All works')

					const participantsResponse = await fetch('/api/participants/' + id)
					const participants = await participantsResponse.json()
					const participantCount = participants.length
					setCurrentEvent(prevEvent => ({ ...prevEvent!, participantCount }))
				} else {
					setCurrentEvent(null)
				}
			} catch (error) {
				console.log('Error fetching event data:', error)
			}
			getComments()
		}
		getEventInfo()
	}, [id])

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

	const eventId = currentEvent?.event_id
	console.log(currentEvent)
	console.log('eventId: ', eventId)
	console.log('event userId:', currentEvent?.user_id)
	console.log('current userId: ', userId)

	return (

		<div className='events'>
			<h2>
				{currentEvent && currentEvent.title}
			</h2>
			{currentEvent?.user_id === userId ? <Link to={'/events/create'} state={{eventId}}><button>Edit event</button></Link> : ''}
			<p>{currentEvent && (currentEvent.isPrivate ? 'Private' : 'Public')} event</p>
			<p>Date and time: {currentEvent && formatDateTime(currentEvent.date_time)}</p>
			<p>Participant count: {currentEvent && currentEvent.participantCount}</p>
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
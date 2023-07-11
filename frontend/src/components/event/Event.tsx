import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

interface Event {
  event_id?: string
  title: string
  content: string
  isPrivate: boolean
  date_time: string
  user_id: number
}

interface Comment {
	user_id: number
	comment: string
	commentdate: string
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

	useEffect(() => {
		const getEventInfo = async () => {
			try {
	
				const response = await fetch('/api/events/event/' + id)
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
			getComments()
		}
		getEventInfo()
	}, [id])
	
	
	const getComments = async() => {
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
		const keyId = nanoid()
		return (<li key={keyId}>
			<p>posted: {comment.user_id? comment.user_id : 'Anon'}</p>
			<p>post: {comment.comment}</p>
			<p>date: {comment.commentdate}</p>
		</li>
		)
	}) 


	const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComment(event.target.value)
	}
	const handlePostComment = async () => {
		console.log('posted!')
		const body = JSON.stringify({eventId: id, comment: comment})
		try {
			await fetch('/api/comments/', {
				method: 'POST',
				body: body,
				headers: {
					'Content-type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			})
		} catch(error) {
			console.log('Error posting comment:', error)
		}
		setComment('')

		getComments()

	}
	
	return (
		
		<div className='events'>
			<h3>
        Title: {currentEvent && currentEvent.title}
			</h3>
			<p>Content: {currentEvent && currentEvent.content}</p>
			<p>Private: {currentEvent && (currentEvent.isPrivate ? 'Yes' : 'No')}</p>
			<p>Date and time: {currentEvent && formatDateTime(currentEvent.date_time)}</p>
			<h3>Comment Section</h3>
			<div>
				<input type='text' value={comment} onChange={handleComment} />
				<button onClick={handlePostComment}>Add Comment</button>
			</div>
			<ul>
				{renderComments}
			</ul>
		</div>
	)
}
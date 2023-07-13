/* eslint-disable indent */
import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './comments.css'

interface Comment {
	user_id: number
	comment: string
	commentdate: string
}

interface User {
	user_id: number
	username: string
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loader({ params }: any) {

	return params.id
}

export default function Comments() {
	const id = useLoaderData() as string
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
		getComments()

		getUsers()
	}, [id])

	const formatDateTime = (dateTime: string): string => {
		const date = new Date(dateTime)
		const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
		const hours = date.getHours()
		const minutes = date.getMinutes().toString().padStart(2, '0')
		const formattedTime = `${hours}:${minutes}`
		return formattedDate + ' ' + formattedTime
	}

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
	
	const renderComments = eventComments?.map(comment => {

		const findUserName = users?.find(user => user.user_id === comment.user_id)

		const keyId = nanoid()
		return (
			<li className='commentItem' key={keyId} >
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

		<div className='comments'>
			<h3>Comment Section</h3>
			<ul className='commentWrapper'>
				<div className='commentInputWrap'>
					<input className='commentInput' type='text' value={comment} onChange={handleComment} />
					<button className='commentBtn' onClick={handlePostComment}>Add Comment</button>
				</div>
				{renderComments ?
					<div className='commentScrollField'>
						{renderComments}
					</div> : <></>}
			</ul>
		</div>

	)
}
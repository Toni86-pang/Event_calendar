import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    newEvent: boolean
    eventId?: number
}

interface Event {
    user_id: number
    title: string
    content: string
    private: boolean
    date_time: string
}

const dummyEvent: Event = { user_id: Infinity, title: '', content: '', private: false, date_time: '' }

function CreateEvent({ newEvent, eventId }: Props) {
	useEffect(() => {
		let event: Event = dummyEvent
		if (!newEvent) {
			const getEvent = async () => {
				const result = await fetch('/api/events/event/' + eventId)
				event = (await result.json())[0]
				console.log(event.title)
				setTitle(event.title)
				setContent(event.content)
				setPrivate(event.private)
                
			}
			getEvent()
            
		}
	},[newEvent,eventId])


	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [isPrivate, setPrivate] = useState(false)
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')

	const navigate = useNavigate()

	const handlePrivate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrivate(e.target.value === 'true')
	}

	const check = () => {

		return (!title || !content || !date || !time) 
		
	}

	const reset = () => {
		setTitle('')
		setContent('')
		setPrivate(false)
		setDate('')
		setTime('')
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const eventData = {
			title: title,
			content: content,
			isPrivate: isPrivate,
			date: date,
			time: time
		}
		if(newEvent){
			try {
				const response = await fetch('/api/events', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(eventData)
				})
	
				if (response.ok) {
					console.log('Event created successfully!')
					console.log(response.json())
					reset()
					navigate('/events')
				} else {
					throw new Error('Failed to create event')
				}
			} catch(error) {
				console.error('Error creating event:', error)
			}
		} else {
			try {
				const response = await fetch('/api/events/' + eventId, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(eventData)
				})
	
				if (response.ok) {
					console.log('Event modified successfully!')
					console.log(response.json())
					reset()
					navigate('/events')
				} else {
					throw new Error('Failed to modify event')
				}
			} catch(error) {
				console.error('Error modifying event:', error)
			}
		}


		console.log('Title:' + title)
		console.log('Content:' + content)
		console.log('Private:' + isPrivate)
		console.log('Date: ' + date)
		console.log('Time: ' + time)
	}

	return (
		<div>
			{newEvent && <h1>Create event</h1> }
			{!newEvent && <h1>Modify event</h1> }
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="title">Name of event: </label>
					<input
						type="text"
						name="title"
						maxLength={75}
						id="title"
						value={title}
						placeholder="Add event name..."
						required
						onChange={e => { setTitle(e.target.value) }}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="content">Content: </label>
					<input
						type="text"
						name="content"
						maxLength={75}
						id="content"
						value={content}
						placeholder="Add content..."
						required
						onChange={e => { setContent(e.target.value) }}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="isPrivate">Private: </label>
					<input
						type="radio"
						name="isPrivate"
						value='true'
						id="isPrivate"
						checked={isPrivate}
						required
						onChange={handlePrivate}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="isPrivate">Public: </label>
					<input
						type="radio"
						name="isPrivate"
						value='false'
						id="isPrivate"
						checked={!isPrivate}
						required
						onChange={handlePrivate}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="date">Date of event: </label>
					<input
						type="date"
						name="date"
						id="date"
						value={date}
						required
						onChange={e => { setDate(e.target.value) }}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="time">Time of event: </label>
					<input
						type="time"
						name="time"
						id="time"
						value={time}
						required
						onChange={e => { setTime(e.target.value) }}
					/>
				</div>
				<div className="form-group">
					<button className="submit"
						type="submit"
						disabled={check()}>
						{newEvent?'Create':'Modify'} event
					</button>
					<button onClick={() => navigate('/')} className="close"
						type="reset">
                        Cancel
					</button>
					<button onClick={reset}>Reset</button>
				</div>
			</form>

		</div>
	)
}

export default CreateEvent

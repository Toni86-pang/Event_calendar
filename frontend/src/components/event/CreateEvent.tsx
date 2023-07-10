import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateEvent() {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isPrivate, setPrivate] = useState(false)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const navigate = useNavigate()

    const onOptionChance = () => {
        setPrivate(true)
    }

    const check = () => {

        if ((!title || !content || !isPrivate || !date || !time)) {
            return true
        }
        return false
    }

    const reset = () => {
        setTitle('')
        setContent('')
        setPrivate(false)
        setDate('')
        setTime('')
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const eventData = {
            title: title,
            content: content,
            isPrivate: isPrivate,
            date: date,
            time: time
        };

        fetch('/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Event created successfully!');
                    console.log(response.json());
                    reset();
                    navigate('/events');
                } else {
                    throw new Error('Failed to create event');
                }
            })
            .catch(error => {
                console.error('Error creating event:', error);
            })
        console.log('Title:' + title)
        console.log('Content:' + content)
        console.log('Private:' + isPrivate)
        console.log('Date: ' + date)
        console.log('Time: ' + time)
    }

    return (
        <div>
            <fieldset>

                <section className="form">
                    <section className="heading">
                        <h1>Create event</h1>
                    </section>
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
                                onChange={e => { setTitle(e.target.value); }}
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
                                onChange={e => { setContent(e.target.value); }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isPrivate">Private: </label>
                            <input
                                type="radio"
                                name="isPrivate"
                                id="isPrivate"
                                required
                                onChange={onOptionChance}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isPrivate">Public: </label>
                            <input
                                type="radio"
                                name="isPrivate"
                                id="isPrivate"
                                required
                                onChange={onOptionChance}
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
                                onChange={e => { setDate(e.target.value); }}
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
                                onChange={e => { setTime(e.target.value); }}
                            />
                        </div>
                        <div className="form-group">
                            <button className="submit"
                                type="submit"
                                disabled={check()}>
                                Create event
                            </button>
                            <button onClick={() => navigate('/')} className="close"
                                type="reset">
                                Cancel
                            </button>
                            <button onClick={reset}>Reset</button>


                        </div>
                    </form>
                </section>
            </fieldset>
        </div>
    )
}

export default CreateEvent

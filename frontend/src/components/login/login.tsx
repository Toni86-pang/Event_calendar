import { useState, ChangeEvent, FormEvent } from 'react'

function LoginForm() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')


	async function handleSubmit(event: FormEvent) {
		event.preventDefault()

		const body = JSON.stringify({username: username, password: password})
		try {
			const response = await fetch('/api/users/login', {
				method: 'POST',
				body: body,
				headers: {
					'Content-type': 'application/json'
				}
			})
			console.log(response)
			const token = await response.json()
			console.log(token)

			localStorage.setItem('token', token)

		} catch (error) {
			console.log('Error login in:', error)
		}

		console.log(localStorage.getItem('token'))
		setUsername('')
		setPassword('')
	}
		
	function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
		setUsername(event.target.value)
	}

	function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username-input">Username:</label>
				<input
					id="username-input"
					type="text"
					onChange={handleChangeUsername}
					value={username}
					required
				/>
			</div>
			<div>
				<label htmlFor="password-input">Password:</label>
				<input
					id="password-input"
					type="password"
					onChange={handleChangePassword}
					value={password}
					required
				/>
			</div>
			<button id="login-button" type="submit">
        Submit
			</button>
		</form>
	)
}

export default LoginForm

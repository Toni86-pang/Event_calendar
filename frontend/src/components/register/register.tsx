import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'


function RegistrationForm() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	function handleSubmit(event: FormEvent) {
		event.preventDefault()

		// Make API call to register the user
		fetch('/api/users/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle the response from the server
				// For example, you can check if the registration was successful
				if (data.success) {
					// onRegister(username, password) // Call the onRegister callback
					navigate('/login')
				} else {
					// Handle the registration error
					console.error('Registration failed:', data.error)
				}
			})
			.catch((error) => {
				// Handle any network or server errors
				console.error('Registration error:', error)
			})

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
				<h2>Register</h2>
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

			<button id="register-button" type="submit">
        Register
			</button>
		</form>
	)
}

export default RegistrationForm

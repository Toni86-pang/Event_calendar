import { useState, ChangeEvent, FormEvent } from 'react';

interface RegistrationFormProps {
  onRegister: (username: string, password: string) => void;
}

function RegistrationForm({ onRegister }: RegistrationFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onRegister(username, password);
    setUsername('');
    setPassword('');
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
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
   
      <button id="register-button" type="submit">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;

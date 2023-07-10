
import { Route } from 'react-router-dom';
import Nav from './components/nav/navbar';
import EventList from './components/event/EventList';
import LoginForm from './components/login/login';

function App() {
  const onSubmitUsername = (username: string, password: string) => {
    alert(`You entered: ${username} and password ${password}`);
  };

  return (
    <div className="App">
      <Route>
        <Nav />
      </Route>
      <div style={{ minWidth: 400 }}>
        <Route path="/login">
          <LoginForm onSubmit={onSubmitUsername} />
        </Route>
      </div>
      <div>
        <Route path="/">
          <EventList />
        </Route>
      </div>
    </div>
  );
}

export default App;

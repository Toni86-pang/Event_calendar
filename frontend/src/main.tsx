import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Nav from './components/nav/navbar';

// import { loader as eventLoader } from './components/event/Event';
import ErrorPage from './ErrorPage';
import RegistrationForm from './components/register/register';
import LoginForm from './components/login/login';
import EventList, { loader as eventsLoader } from './components/event/EventList';

const routes = [
  {
    path: '/',
    element: (
      <>
        <Nav />
      </>
    ),
    children: [
      {
        path: '/events',
        element: <EventList />,
        loader: eventsLoader,
        errorElement: <ErrorPage/>,
      },
      {
        path: '/register',
        element: <RegistrationForm onRegister={handleRegistrationFormSubmit} />,
        errorElement: <ErrorPage/>,
      },
      {
        path: '/login',
        element: <LoginForm onSubmit={handleLoginFormSubmit} />,
        errorElement: <ErrorPage/>,
      },
    ],
  },
];

const routingConfig = createBrowserRouter(routes);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={routingConfig} />
  </React.StrictMode>,
  document.getElementById('root')
);

function handleRegistrationFormSubmit(username: string, password: string) {
  // Handle registration form submission logic here
  console.log('Submitted registration form with username:', username);
  console.log('Submitted registration form with password:', password);
}

function handleLoginFormSubmit(username: string, password: string) {
  // Handle login form submission logic here
  console.log('Submitted login form with username:', username);
  console.log('Submitted login form with password:', password);
}

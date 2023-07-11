import ReactDOM from 'react-dom/client'
import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import EventList, { loader as eventsLoader } from './components/event/EventList'
import Event, { loader as eventLoader } from './components/event/Event'
import ErrorPage from './ErrorPage'
import Nav from './components/nav/navbar';
import './Index.css'
import RegistrationForm from './components/register/register';
import LoginForm from './components/login/login';
import CreateEvent from './components/event/CreateEvent'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      {
        path: '/events',
        element: <EventList />,
        loader: eventsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/register',
        element: <RegistrationForm onRegister={handleRegistrationFormSubmit} />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/login',
        element: <LoginForm onSubmit={handleLoginFormSubmit} />,
      },
      {
        path: '/events/event/:id',
        element: <Event />,
        loader: eventLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'events/create',
        element: <CreateEvent newEvent={false} eventId={1}/>, // debug properties. mitä kautta annetaan lopullisessa appissa?
        errorElement: <ErrorPage />
      }

    ],
    errorElement: <ErrorPage />,

  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
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

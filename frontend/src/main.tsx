import ReactDOM from 'react-dom/client'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EventList, { loader as eventsLoader } from './components/event/EventList'
import Event, { loader as eventLoader } from './components/event/Event'
import Comments, {loader as commentLoader } from './components/commentsi/Comments'
import ErrorPage from './ErrorPage'
import Nav from './components/nav/navbar'
import './main.css'
import RegistrationForm from './components/register/register'
import LoginForm from './components/login/login'
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
				children: [
					{
						path: '/events/event/:id',
						element: <Event />,
						loader: eventLoader,
						errorElement: <ErrorPage />,
						children: [
							{
								path: '/events/event/:id/comments',
								element: <Comments />,
								loader: commentLoader,
								errorElement: <ErrorPage />,
							}
						]
					}
				]
			},
			{
				path: '/register',
				element: <RegistrationForm />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/login',
				element: <LoginForm />,
			},
			{
				path: 'events/create',
				element: <CreateEvent />, // debug properties. mitä kautta annetaan lopullisessa appissa?
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
)



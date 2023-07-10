import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import EventList, { loader as eventsLoader } from './components/event/EventList'
import Event, { loader as eventLoader } from './components/event/Event'
import CreateEvent from './components/event/CreateEvent'
import ErrorPage from './ErrorPage'
import App from './App'
import './Index.css'

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      
      {
        path: '/events/event/:id',
        element: <Event />,
        loader: eventLoader,
        errorElement: <ErrorPage />
      },


    ],


  },
  {
    path: '/events',
    element: <EventList />,
    loader: eventsLoader,
    errorElement: <ErrorPage />
  },
  {
    path: '/events/create',
    element: <CreateEvent />
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

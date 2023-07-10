import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Events, {loader as eventLoader} from './components/event/Events'
import ErrorPage from './ErrorPage'
import App from './App'
import './Index.css'

const router = createBrowserRouter([

  {
    path: '/events/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/events/event/:id',
        element: <Events />,
        loader: eventLoader,
        errorElement: <ErrorPage />
      },

    ],
    

  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

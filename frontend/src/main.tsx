import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Nav from "./components/nav/navbar"

const router = createBrowserRouter ([
{
    path: '/',
    element: <Nav />
},
// {
//     path: '/events',
//     element: <Events />
// }
]) 



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>,
)

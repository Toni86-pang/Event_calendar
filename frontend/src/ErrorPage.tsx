import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError()

    if (!isRouteErrorResponse(error)) {
        console.error(error)
        return (
            <div className='ErrorPage'>
                <h1>An Unexpected error has happened!</h1>
                <p>This should not happen...</p>
            </div>
        )
    }

    if (error.status === 404) return (
        <div className='ErrorPage'>
            <h1>404 - Not Found</h1>
            <p>The page you tried to reach is not here</p>
            <Link to={'/'}>Return to Main Page</Link>
        </div>
    )

    console.error(error)
    return (
        <div className='ErrorPage'>
            <h1>An Unexpected error has happened!</h1>
            <p>({error.status}) {error.statusText}</p>
            {error.data?.message
                ? <p>{error.data.message}</p>
                : null}
        </div>
    )
}
import express, {Request, Response} from 'express'
import { authenticate, unknownEndpoint } from './middleware'
import usersRouter from './routers/usersRouter'
import eventsRouter from './routers/eventsRouter'
import commentsRouter from './routers/commentsRouter'
import invitationsRouter from './routers/invitationsRouter'

const server = express()

server.use('/', express.static('./dist/client'))

server.use(express.json())
server.get('/api/version', (req: Request, res: Response) => {
	res.send('Server version 0.3.2')
})
<<<<<<< HEAD
server.use('/api/users',  usersRouter)
server.use('/api/events', authenticate, eventsRouter)
server.use('/api/comments', authenticate, commentsRouter)
=======

server.use('/api/users',  usersRouter)
server.use('/api/events', authenticate, eventsRouter)
server.use('/api/comments', authenticate, commentsRouter)
server.use('/api/invitations', authenticate, invitationsRouter)

>>>>>>> 098944ad459395a3bff709c0fa945b6429f730c1
server.use(unknownEndpoint)

export default server
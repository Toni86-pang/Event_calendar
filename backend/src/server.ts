import express, { Request, Response } from 'express'
import { authenticate, unknownEndpoint } from './middleware'
import usersRouter from './routers/usersRouter'
import eventsRouter from './routers/eventsRouter'
import commentsRouter from './routers/commentsRouter'
import invitationsRouter from './routers/invitationsRouter'
import participantsRouter from './routers/participantsRouter'

const server = express()

server.use('/', express.static('./dist/client'))

server.use(express.json())
server.get('/api/version', (req: Request, res: Response) => {
	res.send('Server version 1.0')
})

server.use('/api/users', usersRouter)
server.use('/api/events', authenticate, eventsRouter)
server.use('/api/comments', authenticate, commentsRouter)
server.use('/api/invitations', authenticate, invitationsRouter)
server.use('/api/participants', participantsRouter)
server.get('*', (_req, res) => {
	res.sendFile('index.html', { root: './dist/client' })
})
server.use(unknownEndpoint)

export default server
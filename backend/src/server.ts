import express, {Request, Response} from 'express'
import { authenticate, unknownEndpoint } from './middleware'
import usersRouter from './routers/usersRouter'
import eventsRouter from './routers/eventsRouter'
import commentsRouter from './routers/commentsRouter'

const server = express()

server.use('/', express.static('./dist/client'))

server.use(express.json())
server.get('/version', (req: Request, res: Response) => {
	res.send('Server version 0.3.0')
})
server.use('/users',  usersRouter)
server.use('/events', authenticate, eventsRouter)
server.use('/comments', authenticate, commentsRouter)
server.use(unknownEndpoint)

export default server
import express from 'express'
import usersRouter from './routers/usersRouter'
import { authenticate, unknownEndpoint } from './middleware'
import eventsRouter from './routers/eventsRouter'

const server = express()

server.use('/', express.static('./dist/client'))

server.use(express.json())
server.use('/users',  usersRouter)
server.use('/events', authenticate, eventsRouter)
server.use(unknownEndpoint)

export default server
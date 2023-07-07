import express from 'express'
import usersRouter from './routers/usersRouter'
import { authenticate, unknownEndpoint } from './middleware'

const server = express()

// server.use('/', express.static('./dist/client'))

server.use(express.json())
server.use('/users', usersRouter)

server.use(unknownEndpoint)

export default server
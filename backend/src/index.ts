import express, { Request, Response } from 'express'
import server from './server'
import eventsRouter from './routers/eventsRouter'

server.use('/', express.static('./dist/client'))

server.get('/version', (req: Request, res: Response) => {
	res.send('Server version 0.2.5')
})

server.use('/events', eventsRouter)

const PORT = process.env.PORT
server.listen(PORT, () => console.log('Listening', PORT))
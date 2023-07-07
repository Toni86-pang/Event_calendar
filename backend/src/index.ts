import express, { Request, Response } from 'express'
import server from './server'
import eventsRouter from './routers/eventsRouter'
import { authenticate } from './middleware'

server.use('/', express.static('./dist/client'))

server.get('/version', (req: Request, res: Response) => {
	res.send('Server version 0.2.5.2')
})

server.use('/events', authenticate, eventsRouter)

const PORT = process.env.PORT
server.listen(PORT, () => console.log('Server pumping in port:', PORT))
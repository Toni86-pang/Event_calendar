import express, { Request, Response } from 'express'
import server from './server'
import { getEvents} from './dao'


server.use('/', express.static('./dist/client'))

server.get('/version', (req: Request, res: Response) => {
    res.send('Server version 0.2')
})

server.get('/events', async (req: Request, res: Response) => {
    const events = await getEvents()
    res.send(events)
})

const PORT = process.env.PORT
server.listen(PORT, () => console.log('Listening', PORT))
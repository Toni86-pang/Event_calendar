import express, { Request, Response } from 'express'
import { getEvents} from './dao'

const server = express()

server.use('/', express.static('./dist/client'))

server.get('/version', (req: Request, res: Response) => {
    res.send('Server version 0.1')
})

server.get('/events', async (req: Request, res: Response) => {
    const events = await getEvents()
    res.send(events)
})

const PORT = process.env.PORT
server.listen(PORT, () => console.log('Listening', PORT))
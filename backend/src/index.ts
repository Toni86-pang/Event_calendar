import express, { Request, Response } from 'express'
import server from './server'


server.use('/', express.static('./dist/client'))

server.get('/version', (req: Request, res: Response) => {
	res.send('Server version 0.2.6')
})

const PORT = process.env.PORT
server.listen(PORT, () => console.log('Server pumping in port:', PORT))
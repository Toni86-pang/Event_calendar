import express from 'express'
import server from './server'


server.use('/', express.static('./dist/client'))

const PORT = process.env.PORT
server.listen(PORT, () => console.log('Server pumping in port:', PORT))
import express from 'express'
import { config } from 'dotenv'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { appError } from './src/utilties/appError.js'
import { globalError } from './src/utilties/globalError.js'
import { bootstrab } from './src/modules/routes.js'
import { dbConnection } from './database/connection.js'
import { createOnlineOrder } from './src/modules/order/controller/order.controller.js'

const app = express()
dbConnection()
config()
app.use(cors())
app.post('/webhook', express.raw({ type: 'application/json' }),createOnlineOrder)

app.use(express.json())
app.use('/uploads', express.static('uploads'))
bootstrab(app)
app.use('*', (req, res, next) => {
    next(new appError('url not founded', 404))
})
app.use(globalError)
const port = 3000
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
})
import express from 'express'
import mongoose from 'mongoose'
import cardRout from './routes/cardRourt'
import iamgesRout from './routes/iamgesRout'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const url: any = process.env.DATABASEURL

app.use(express.json({limit: '50mb'}))

app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use(cors({ origin: 'http://localhost:3000' }))

app.use('/', cardRout)

app.use('/images', iamgesRout)


mongoose.connect(url).then(() => {
    app.listen(PORT, () => console.log(`app listening on PORT ${PORT}!`))
}).catch((error) => console.log(error))



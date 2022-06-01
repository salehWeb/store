import express from 'express'
import mongoose from 'mongoose'
import cardRout from './routes/cardRourt'
import iamgesRout from './routes/iamgesRout'
import userRout from './routes/userRout'
import admanRout from './routes/admanRout'
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const url: any = process.env.DATABASEURL


app.use(express.json({ limit: '50mb' }))

app.use(express.urlencoded({ limit: '50mb', extended: true }))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/', cardRout)
app.use('/login', userRout)
app.use('/images', iamgesRout)
app.use('/adman', admanRout)


mongoose.connect(url)
    .then(() => {
        app.listen(PORT, () => console.log(`app listening on PORT ${PORT}!`))
    })
    .catch((error) => console.log(error))




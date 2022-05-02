import express from 'express'
const app = express()
import mongoose from 'mongoose'
import itemRout from './routes/cardRourt'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000
const url: any = process.env.DATABASEURL
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(cors({ origin: '*' }))

app.use('/', itemRout)



mongoose.connect(url).then(() => {
    app.listen(PORT, () => console.log(`app listening on PORT ${PORT}!`))
}).catch((error) => console.log(error))



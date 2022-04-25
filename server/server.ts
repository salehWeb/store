import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(PORT, () => console.log(`app listening on PORT ${PORT}!`))
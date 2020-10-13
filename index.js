import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import router from './router.js'

const app = express()

// Connect to DB
mongoose.connect(process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true,}
).then(() => {
    console.log('Connect to DB success')
}).catch(err => {
    console.log('Connect to DB failed: ' + err)
})

// Middleware
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'success'
    })
})

app.use('/api', router)

app.listen(`${process.env.PORT}`, () => {
    console.log(`App listens to port ${process.env.PORT}`)
})
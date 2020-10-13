import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import router from './router.js'

const app = express()

// Connect to DB
mongoose.connect('mongodb+srv://admin:admin@cluster0.gio0q.mongodb.net/latihan?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true,}
).then(() => {
    console.log('Connect to DB success')
}).catch(err => {
    console.log('Connect to failed ' + err)
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

app.listen('3000', () => {
    console.log('App listens to port 3000')
})
import express from 'express'
import Homework from './database.js'

const router = express.Router()

router.post('/homeworks', async (req, res) => {
    try {
        const { course, title, due_date, status } = req.body;

        const homework = new Homework({
            course,
            title,
            status,
            due_date,
        })

        const createdHomework = await Homework.save();

        res.status(201).json(createdHomework)
    } catch (err) {
        res.status(500).json({ error: 'Database creation failed'})
    }
})

export default router;
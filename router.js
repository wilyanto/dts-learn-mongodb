import express from 'express'
import Homework from './database.js'

const router = express.Router()

//@desc Create a homework
//@route POST /api/homeworks
router.post('/homeworks', async (req, res) => {
    try {
        const { course, title, due_date, status } = req.body;

        const homework = new Homework({
            course,
            title,
            status,
            due_date,
        })

        const createdHomework = await homework.save();

        res.status(201).json(createdHomework)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Database creation failed'})
    }
})

//@desc Get all homeworks
//@route GET /api/homeworks
router.get('/homeworks', async (req, res) => {
    const homeworks = await Homework.find({})

    if (homeworks) {
        res.json(homeworks)
    } else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})

//@desc Get certain homework
//@route GET /api/homeworks
router.get('/homeworks/:id', async (req, res) => {
    const homeworks = await Homework.findById(req.params.id)

    if (homeworks) {
        res.json(homeworks)
    } else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})

router.put('/homeworks/:id', async (req, res) => {
    const { course, title, due_date, status} = req.body

    const homework = await Homework.findById(req.params.id)

    if (homework) {
        homework.course = course
        homework.title = title
        homework.due_date = due_date
        homework.status = status

        const updateHomework = await homework.save()

        res.json(updateHomework)
    } else {
        res.status(404).json({
            message: 'homework not found'
        })
    }
})

export default router;
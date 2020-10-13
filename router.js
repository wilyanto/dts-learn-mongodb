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

    if (homeworks.length > 0) {
        res.json(homeworks)
    } else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})

//@desc Get certain homework
//@route GET /api/homeworks/:id
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

//@desc PUT certain homework
//@route PUT /api/homeworks/:id
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

//@desc Delete certain homework
//@route DELETE /api/homeworks/:id
router.delete('/homeworks/:id', async (req, res) => {
    const homework = await Homework.findById(req.params.id)

    if (homework) {
        await homework.remove()
        res.json({
            message : 'Data removed'
        })
    } else {
        res.status(200).json({
            message : 'Homework not found'
        })
    }
})

//@desc Delete all homeworks
//@route DELETE /api/homeworks/
router.delete('/homeworks', async (req, res) => {
    const homework = await Homework.deleteMany()

    if (homework) {
        res.json({
            message : 'Success deleted all homeworks'
        })
    } else {
        res.status(404).json({
            message : 'Failed to delete homeworks'
        })
    }
})


export default router;
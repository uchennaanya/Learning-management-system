const Course = require('../models/courseSchema')

createCourse = async (req, res) => {
    try {
        let courseExist = await Course.findOne({ courseName: req.body.courseName })
        if (courseExist) {
            return res.json({
                message: 'Error!',
                response: 'Course already added'
            })
        } else {

            let newCourse = new Course(req.body)

            let data = await newCourse.save()
            return res.send({
                message: 'Saved',
                courseData: data
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500)
            .send({
                msg: err.message,
                status: 500
            })
    }
}

getCourses = async (req, res) => {
    try {
        let getCourses = await Course.find({})
        return res.json({
            message: "Found",
            response: getCourses
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({
            msg: err.message,
            status: 500
        })
    }
}

getCourse = async (req, res) => {
    try {

        let getCourse = await Course.findOne({ "_id": req.params.id })
        return res.json({
            message: "Success!",
            response: getCourse
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({
            msg: err.message,
            status: 500
        })
    }
}

updateCourse = async (req, res) => {
    try {
        let { courseName, venue, status } = req.body
        let updated = await Course.findByIdAndUpdate(req.params.id, { courseName, venue, status }, { new: true })
        return res.json({
            message: "Success!",
            response: updated
        })

    } catch (err) {
        console.log(err.message)
        return res.json({
            message: err.message,
            response: "Fail to update"
        })
    }
}

deleteCourse = async (req, res) => {
    try {
        let deleteCourse = await Course.findByIdAndDelete({ _id: req.params.id })
        return res.json({
            message: "Success",
            response: deleteCourse
        })

    } catch (err) {
        console.log(err.message)
        return res.json({
            message: err.message,
            response: "Fail to update"
        })
    }
}

module.exports = { createCourse, getCourses, getCourse, updateCourse, deleteCourse }

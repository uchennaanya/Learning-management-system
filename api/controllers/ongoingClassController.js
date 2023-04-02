const OngoingClass = require('../models/ongoingClassesSchema.js')

createOngoingClass = async (req, res) => {
    try {
        let ongoingClassExist = await OngoingClass.findOne({ ongoingCourseId: req.body.ongoingCourseId })
        if (ongoingClassExist) {
            return res.json({
                message: 'Error!',
                response: 'Course already exist'
            })
        } else {

            let newOngoingClass = new OngoingClass(req.body)

            let studentData = await newOngoingClass.save()
            return res.send({
                message: 'success',
                userData: studentData
            })
        }
    } catch (err) {
        console.log(err.message)
        return res.status(500)
            .send({
                msg: err.message,
                status: 500
            })
    }
}

getOngoingClasses = async (req, res) => {
    try {
        let getOngoingClasses = await OngoingClass.find({})
        return res.json({
            message: "Success!",
            response: getOngoingClasses
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg: err.message,
            status: 500
        })
    }
}

getOngoingClass = async (req, res) => {
    try {

        let getOngoingClass = await OngoingClass.findOne({ "_id": req.params.id })
        return res.json({
            message: "Success!",
            response: getOngoingClass
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({
            msg: err.message,
            status: 500
        })
    }
}

updateOngoingClass = async (req, res) => {
    try {
        let { endDate, status } = req.body
        let ongoingClassUpdated = await OngoingClass.findByIdAndUpdate(req.params.id, { endDate, status }, { new: true })
        return res.json({
            message: "Record updated!",
            response: ongoingClassUpdated
        })

    } catch (err) {
        console.log(err.message)
        return res.json({
            message: err.message,
            response: "Fail to update"
        })
    }
}

deleteOngoingClass = async (req, res) => {
    try {
        let deletestudent = await OngoingClass.findByIdAndDelete({ _id: req.params.id })
        return res.json({
            message: "Success",
            response: deletestudent
        })

    } catch (err) {
    }
}

module.exports = { createOngoingClass, getOngoingClasses, getOngoingClass, updateOngoingClass, deleteOngoingClass }

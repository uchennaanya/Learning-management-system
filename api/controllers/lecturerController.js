const Lecturer = require('../models/lecturerSchema')
const jwt = require('jsonwebtoken')

createLecturer = async (req, res) => {
    try {
        let lecturerExist = await Lecturer.findOne({ lecturerName: req.body.lecturerName })
        if (lecturerExist) {
            return res.json({
                message: 'Error!',
                response: 'Lecturer already exist'
            })
        } else {
            let newLecturer = new Lecturer(req.body)

            let lecturerPayLoad = { lecturerName: newLecturer.lecturerName, lecturerEmail: newLecturer.lecturerEmail }

            const lecturerToken = jwt.sign(lecturerPayLoad, process.env.SECRETKEY)

            let savedLecturer = await newLecturer.save()
            // let lecturerData = await newLecturer.save()
            return res.send({
                message: 'Saved',
                regCode: savedLecturer.regCode,
                // userData: lecturerData,
                lecturerToken
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            msg: err.message,
            status: 500
        })
    }
}

lecturerLogin = async (req, res) => {

    const { lecturerEmail, password } = req.body;
    if (!lecturerEmail || !password) {
        return res.status(400).send({ message: "Missing required fields" });
    }
    const lecturer = await Lecturer.findOne({
        lecturerEmail: req.body.lecturerEmail
    });
    if (lecturer == null)
        return res.status(400).send({ message: "User not found!" });
    try {

        if (lecturer.comparePassword(req.body.password, lecturer.password)) {
            const lecturerPayLoad = { lecturerEmail: lecturer.lecturerEmail }

            const lecturerToken = jwt.sign(lecturerPayLoad, process.env.SECRETKEY)

            res.send({ success: true, lecturertoken: lecturerToken, message: "Lecturer logged in" });

        } else {
            res.status(400).send({ message: "Invalid credentials!" });
        }

    } catch (error) {
        res.status(500).send({ message: "Server error", reason: error.message });
    }
};

getLecturers = async (req, res) => {
    try {
        let getLecturers = await Lecturer.find({})
        return res.json({
            message: "Records found ",
            response: getLecturers
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({
            msg: err.message,
            status: 500
        })
    }
}

getLecturer = async (req, res) => {
    try {

        let getLecturer = await Lecturer.findOne({ "_id": req.params.id })
        return res.json({
            message: "Record found ",
            response: getLecturer
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            msg: err.message,
            status: 500
        })
    }
}

updateLecturer = async (req, res) => {
    try {
        let { lecturerName, lecturerEmail } = req.body
        let updateLecturer = await Lecturer.findByIdAndUpdate(req.params.id, { lecturerName, lecturerEmail }, { new: true })
        return res.json({
            message: "Success!",
            response: updateLecturer
        })

    } catch (err) {
        console.log(err.message)
        return res.json({
            message: err.message,
            response: "Fail to update record"
        })
    }
}

deleteLecturer = async (req, res) => {
    try {
        let deleteLecturer = await Lecturer.findByIdAndDelete({ _id: req.params.id })
        return res.json({
            message: "Success",
            response: deleteLecturer.lecturerName + "Deleted"
        })

    } catch (err) {
    }
}

module.exports = { createLecturer, lecturerLogin, getLecturers, getLecturer, updateLecturer, deleteLecturer }

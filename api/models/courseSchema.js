const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    "courseId": {
        type: String,
        required: true,
    },

    "courseName": {
        type: String,
        required: true
    },

    "venue": {
        type: String,
        required: true,
    },

    "status": {
        type: Boolean,
        required: true
    },

    "created_at": {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("course", courseSchema)

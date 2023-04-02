const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ongoingClasses = new Schema({
    "ongoingClassId": {
        type: String,
        required: true,
    },

    "courseId": {
        type: String,
        required: true
    },

    "lectureId": {
        type: String,
        required: true,
    },

    "startDate": {
        type: Date,
        required: true
    },

    "endDate": {
        type: String,
        required: true
    },

    "status": {
        type: String,
        required: true
    },

    "created_at": {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("ongoingclass", ongoingClasses)

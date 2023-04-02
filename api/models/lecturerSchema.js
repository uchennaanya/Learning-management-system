const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require("bcrypt");


const lecturerSchema = new Schema({

    "lecturerName": {
        type: String,
        required: true,
    },

    "lecturerEmail": {
        type: String,
        required: true,
    },

    "password": {
        type: String,
        required: true,
    },

    "ongoingCourseId": {
        type: Array,
        required: true
    },

    "createdAt": {
        type: Date,
        default: Date.now
    },
})

lecturerSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);

};

module.exports = mongoose.model("lecturer", lecturerSchema)

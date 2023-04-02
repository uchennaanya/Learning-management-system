
require('dotenv').config()

const jwt = require('jsonwebtoken')

const Student = require('../models/studentSchema')

module.exports = async (req, res, next) => {
    let token = req.header.authorization;
    if (!token) res.send("Please provide token");
    token = token.split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.SECRETKEY, Student)

    let studentToken = await Student.find({ studentPhone: decodedToken.studentPhone })

   /* if (decodedToken.studentPhone == "studentPhone") {
        next()

   * } else {
        console.error("Restricted! ")
    }*/

}

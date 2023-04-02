const route = require('express').Router()

const studentToken = require('../auth/studentAuth')

const { createStudent, getStudents, getStudent, updateStudent, deleteStudent, studentLogin } = require('../controllers/studentController');

route.post('/createstudent', createStudent)
route.get('/getstudents', getStudents)
route.get('/getstudent/:id', getStudent)
route.patch('/updatestudent/:id', updateStudent)
route.delete('/deletestudent/:id', deleteStudent)
route.post('/studentLogin/', studentToken, studentLogin)

module.exports = route

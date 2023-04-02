const route = require('express').Router()


const { createCourse, getCourses, getCourse, updateCourse, deleteCourse } = require('../controllers/courseController');

route.post('/createcourse', createCourse)
route.get('/getcourses', getCourses)
route.get('/getcourse/:id', getCourse)
route.patch('/updatecourse/:id', updateCourse)
route.delete('/deletecourse/:id', deleteCourse)

module.exports = route

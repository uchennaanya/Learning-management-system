const route = require('express').Router()
const { getExams, createExam, getExam, updateExam, deleteExam } = require('../controllers/ExamController');

route.post('/createexam', createExam)
route.get('/getexams', getExams)
route.get('/getexam/:id', getExam)
route.patch('/updateexam/:id', updateExam)
route.delete('/deleteexam/:id', deleteExam)

module.exports = route

const route = require('express').Router()
const { getLecturers, createLecturer, lecturerLogin, getLecturer, updateLecturer, deleteLecturer } = require('../controllers/lecturerController');

route.post('/createlecturer', createLecturer)
route.post('/lecturerlogin', lecturerLogin)
route.get('/getlecturers', getLecturers)
route.get('/getlecturer/:id', getLecturer)
route.put('/updatelecturer/:id', updateLecturer)
route.delete('/deletelecturer/:id', deleteLecturer)

module.exports = route

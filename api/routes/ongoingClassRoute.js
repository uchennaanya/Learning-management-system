const route = require('express').Router()
const { createOngoingClass, getOngoingClasses, getOngoingClass, updateOngoingClass, deleteOngoingClass } = require('../controllers/ongoingClassController');

route.post('/createongoingclass', createOngoingClass)
route.get('/getongoingclasses', getOngoingClasses)
route.get('/getongoingclass/:id', getOngoingClass)
route.patch('/updateongoingclass/:id', updateOngoingClass)
route.delete('/deleteongoingclass/:id', deleteOngoingClass)

module.exports = route

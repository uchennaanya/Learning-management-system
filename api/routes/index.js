
const router = require('express').Router()

router.use(require('./examRoute'))
router.use(require('./courseRoute'))
router.use(require('./studentRoute'))
router.use(require('./lecturerRoute'))
router.use(require('./ongoingClassRoute'))

module.exports = router

const { Router } = require('express');
const router = Router()

router.use('/admin', require('./admin/board'));

router.use('/login', require('./login'))

module.exports = router;
const { Router } = require('express');
const router = Router()

router.use('/admin', require('./admin/board'));

router.use('/front', require('./front/board'));

module.exports = router;
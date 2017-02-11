var express = require('express');
var router = express.Router();
router.get('/', (req, res, next) => {
    res.send('route5');
});

module.exports = router;
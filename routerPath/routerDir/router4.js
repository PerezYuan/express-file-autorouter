var express = require('express');
var router = express.Router();
router.get('/', (req, res, next) => {
    res.send('route4');
});

module.exports = router;
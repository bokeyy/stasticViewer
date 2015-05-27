var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('目前暂无登录功能么么哒');
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '百度统计辅助查看工具'});
});

module.exports = router;

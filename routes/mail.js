var express = require('express');
var MailParser = require("mailparser").MailParser;

var router = express.Router();

router.post('/', function (req, res, next) {
    console.log(req);
    res.send('ok');
});

router.get('/', function(req, res, next){
    res.send('你好~这里木有内容')
});

module.exports = router;

var express = require('express');
var MailParser = require("mailparser").MailParser;

var router = express.Router();

router.post('/', function (req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function(chunk) {
        req.rawBody += chunk;
    });

    req.on('end', function() {
        console.log(req.rawBody);
        next();
    });
    res.send('ok');
});

router.get('/', function(req, res, next){
    res.send('你好~这里木有内容')
});

module.exports = router;

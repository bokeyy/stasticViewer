var express = require('express');
var fs = require("fs");
var MailParser = require("mailparser").MailParser;

var router = express.Router();
var parseMailData;

router.post('/', function (req, res, next) {
    var data = '';

    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function () {
        parseMailData(data);
        next();
    });
    res.send('ok');
});

parseMailData = function (mailData) {

    var mailparser = new MailParser({
        debug: true,
        defaultCharset: 'utf8'
    });

    mailparser.on("headers", function (headers) {
        console.log(headers.received);
    });
    mailparser.on("end", function (mail) {
        console.log(mail); // object structure for parsed e-mail
    });
    mailparser.write(mailData);
};

router.get('/', function (req, res, next) {
    res.send('你好~这里木有内容')
});

module.exports = router;

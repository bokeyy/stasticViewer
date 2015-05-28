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
    });
    res.send('ok');
});

parseMailData = function (mailData) {

    var mailparser = new MailParser({
        debug: true,
        defaultCharset: 'utf-8',
        streamAttachments: true
    });
    mailparser.on("headers", function (headers) {
        console.log(headers.received);
    });
    mailparser.on("end", function (mail) {
        console.log("From:", mail.from); //[{address:'sender@example.com',name:'Sender Name'}]
        console.log("Subject:", mail.subject); // Hello world!
        console.log("Text body:", mail.text); // How are you today?
        mail.attachments.forEach(function(attachment){
            console.log(attachment.fileName);
        });
    });
    mailparser.write(mailData);
};

router.get('/', function (req, res, next) {
    res.send('这里木有内容')
});

module.exports = router;

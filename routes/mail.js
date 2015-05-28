var express = require('express');
var fs = require('fs');
var MailParser = require("mailparser").MailParser;

var router = express.Router();
var statMailParser = new MailParser();

router.post('/mime', function (req, res, next) {
    statMailParser.write(req.body['body-mime']);
    statMailParser.on("end", function (mail) {
        console.log("From:", mail.from); //[{address:'sender@example.com',name:'Sender Name'}]
        console.log("Subject:", mail.subject); // Hello world!
        console.log("Text body:", mail.text); // How are you today?
        mail.attachments.forEach(function (attachment) {
            console.log('附件：\n', attachment.content);
        });
    });
    statMailParser.end();
    res.send('ok');
});

router.post('/in', function (req, res, next) {
    console.log(req['attachment-count']);
    res.send('ok');
});

router.get('/', function (req, res, next) {
    res.send('这里木有内容')
});

module.exports = router;

var express = require('express');
var MailParser = require("mailparser").MailParser;

var router = express.Router();
var statMailParser = new MailParser({
    /*debug: true,*/
    defaultCharset: 'utf-8'
});

router.post('/inbox/', function (req, res, next) {
    statMailParser.on("end", function (mail) {
        console.log("From:", mail.from); //[{address:'sender@example.com',name:'Sender Name'}]
        console.log("Subject:", mail.subject); // Hello world!
        console.log("Text body:", mail.text); // How are you today?
        mail.attachments.forEach(function (attachment) {
            console.log('附件：\n', attachment.fileName);
        });
    });
    req.pipe(statMailParser);
    res.send('ok');
});

router.post('/notify/', function (req, res, next) {
    console.log(req.body);
});

router.get('/', function (req, res, next) {
    res.send('这里木有内容')
});

module.exports = router;

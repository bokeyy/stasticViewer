var express = require('express');
var fs = require("fs");
var MailParser = require("mailparser").MailParser;

var router = express.Router();

router.post('/', function (req, res, next) {
    var statMailParser = new MailParser({/*
     debug: true,*/
        defaultCharset: 'utf-8'
    });

    req.on('data', function (chunk) {
        statMailParser.write(new Buffer(chunk), 'utf-8')
    });
    req.on('end', function () {/*
        fs.writeFile('~/email.eml', data, function (err) {
            if (err) throw err;
            console.log("保存文件成功");
        });*/
        statMailParser.end();
        statMailParser.on("end", function (mail) {
            console.log("From:", mail.from); //[{address:'sender@example.com',name:'Sender Name'}]
            console.log("Subject:", mail.subject); // Hello world!
            console.log("Text body:", mail.text); // How are you today?
            mail.attachments.forEach(function(attachment){
                console.log('附件：\n', attachment.fileName);
            });
        });
    });
    res.send('ok');
});

router.get('/', function (req, res, next) {
    res.send('这里木有内容')
});

module.exports = router;

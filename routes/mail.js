var express = require('express');
var fs = require('fs');
var MailParser = require("mailparser").MailParser;
var CSV = require("comma-separated-values");
var AV = require('avoscloud-sdk').AV;

var router = express.Router();
var statMailParser = new MailParser();

AV.initialize("06lemnqefoaigmzf7ta2n6f69jbfz37i6hpwimgymuwxk8qy", "37hhl2mxf9g0dsdvs1doy52q39cvpmsiyry7ovyap65oo10s");
var DOMLoadedTable = AV.Object.extend("DOMLoaded");

router.post('/mime', function (req, res, next) {
    statMailParser.write(req.body['body-mime']);
    statMailParser.on("end", function (mail) {
        console.log("From:", mail.from); //[{address:'sender@example.com',name:'Sender Name'}]
        console.log("Subject:", mail.subject); // Hello world!
        console.log("Text body:", mail.text); // How are you today?
        mail.attachments && mail.attachments.forEach(function (attachment) {
            console.log(attachment.fileName);

            if (attachment.contentType === "text/csv") {
                new CSV(attachment.content.toString()).forEach(function (array) {
                    for(var name in array){
                        console.log(name);
                    }
                });
            }
        });
    });
    statMailParser.end();
    res.send('ok');
});

router.post('/in', function (req, res, next) {
    res.send('ok');
});

router.get('/', function (req, res, next) {
    res.send('这里木有内容')
});

module.exports = router;

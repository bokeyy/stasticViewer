var express = require('express');
var MailParser = require("mailparser").MailParser;
var CSV = require("comma-separated-values");
var router = express.Router();
var statMailParser = new MailParser();
var DOMLoadedTable = require('../server/leanCloud').DOMLoaded;

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
                    try {
                        var DOMLoadedItem = array[1].split(',');
                        if (DOMLoadedItem.length !== 2) {
                            throw new Error('标签格式不符' + array[1])
                        }

                        var miliSeconds = DOMLoadedItem[0];
                        var pathName = DOMLoadedItem[1];
                        var DOMLoadedArray = DOMLoadedTable.get(pathName);
                        DOMLoadedArray = DOMLoadedArray ? DOMLoadedArray : [];

                        DOMLoadedArray.push({time: miliSeconds, date: new Date()});
                        DOMLoadedTable.set(pathName, DOMLoadedArray);

                        console.log(DOMLoadedArray);
                    } catch (err) {
                        console.log(err);
                    }
                });
                DOMLoadedTable.save(null, {
                    success: function (DOMLoadedTable) {
                        // Execute any logic that should take place after the object is saved.
                        console.log('New object created with objectId: ' + DOMLoadedTable.id);
                    },
                    error: function (DOMLoadedTable, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a AV.Error with an error code and description.
                        console.log('Failed to create new object, with error code: ' + error.message);
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
    res.send('这里木有内容');
});

module.exports = router;

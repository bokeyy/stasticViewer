var express = require('express');
var MailParser = require("mailparser").MailParser;

var router = express.Router();

/* GET mail listing. */
router.get('/', function (req, res, next) {
    console.log(req);
});

module.exports = router;

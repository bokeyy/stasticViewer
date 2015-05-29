var express = require('express');
var AV = require('avoscloud-sdk').AV;

var router = express.Router();

AV.initialize("06lemnqefoaigmzf7ta2n6f69jbfz37i6hpwimgymuwxk8qy", "37hhl2mxf9g0dsdvs1doy52q39cvpmsiyry7ovyap65oo10s");
var DOMLoadedTableClass = AV.Object.extend("DOMLoaded");
var DOMLoadedTable = new DOMLoadedTableClass;

router.get('/', function (req, res, next) {
    console.log(DOMLoadedTable.get('/'));
    res.render('charts', {
        DomLoadedData: DOMLoadedTable.get('/')
    });
});

module.exports = router;

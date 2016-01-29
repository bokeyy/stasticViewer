var exports;

var AV = require('avoscloud-sdk').AV;
AV.initialize("06lemnqefoaigmzf7ta2n6f69jbfz37i6hpwimgymuwxk8qy", "37hhl2mxf9g0dsdvs1doy52q39cvpmsiyry7ovyap65oo10s");

var DOMLoadedTableClass = AV.Object.extend("DOMLoaded");
var DOMLoadedTable = new DOMLoadedTableClass;

var loginClass = AV.Object.extend("login");
var login = new loginClass;

console.log(exports);

exports = {
    DOMLoaded: DOMLoadedTable,
    users: login
};

module.exports = exports;
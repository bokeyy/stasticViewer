var express = require('express');
var router = express.Router();
var md5 = require('MD5');
var AV = require('avoscloud-sdk').AV;

AV.initialize("06lemnqefoaigmzf7ta2n6f69jbfz37i6hpwimgymuwxk8qy", "37hhl2mxf9g0dsdvs1doy52q39cvpmsiyry7ovyap65oo10s");
var loginClass = AV.Object.extend("login");
var login = new loginClass;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('木有用户列表');
});

router.get('/5567ff2ee4b0349d3314866d', function(req, res, next){
    login.set('admin', md5('admin')); // reset password : user, pass
    login.save(null, {
        success: function (login) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + login.id);
        },
        error: function (login, error) {
            // Execute any logic that should take place if the save fails.
            // error is a AV.Error with an error code and description.
            console.log('Failed to create new object, with error code: ' + error.message);
        }
    });
});

router.post('/login', function (req, res, next) {

    var checkPassed = false;
    try{
        if(login.get(req.body.username) === md5(req.body.password)){
            checkPassed = true;
        }
    }catch(err){
        console.log('login failed \n', req.body, err);
        res.send('login failed');
    }

    checkPassed && res.redirect('/charts/');

    // TODO 登录校验没加 Cookie ，假得不得了
    //checkPassed && res.redirect('/users/user/' + req.body.username);
});

router.get('/user/:username', function(req, res, next){
    res.render('users', {
        username: req.params.username
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var md5 = require('MD5');
var login = require('../server/leanCloud').users;

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
        //console.log(login.get(req.body.username), login);
        if(login.get(req.body.username) === md5(req.body.password)){
            checkPassed = true;
        }
    }catch(err){
        console.log('login failed \n', req.body, err);
        res.send('login failed');
    }

    if(checkPassed){res.redirect('/users/username/' + req.body.username);}else{
        console.log('check not passed', req.body);
        res.send('login failed');
    }

    // TODO 登录校验没加 Cookie ，假得不得了
    //checkPassed && res.redirect('/users/user/' + req.body.username);
});

router.get('/username/:username', function(req, res, next){
    res.render('users', {
        username: req.params.username
    });
});

module.exports = router;

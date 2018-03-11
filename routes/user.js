var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var model = require('../models/relation');

router.get('/', function(req, res, next) {
    model.User.findAll({})
    .then(users => res.json({
        error: false,
        data: users
      }))
      .catch(error => res.json({
        error: true,
        data: [],
        error: error
      }));
})

router.post('/login', function(req, res, next) {
    const name = req.body.username;
    const password = req.body.password;
    console.log(model)
    model.User.findOne({
        where: {
            username: name
        }
    }).then(user => {
        if (!user) {
            res.json({error: true, message: '认证失败， 用户名找不到'});
        } else if(user) {
            // 检查密码
            if (user.dataValues.password != password) {
     
                res.json({error: true, message: '认证失败， 密码错误'});
   
            } else {
                const payload = {
                    active: user.dataValues.active
                }
                // 创建token
                var token = jwt.sign(payload, '1', {expiresIn: '1h'});
                // json格式返回token

                res.json({
                    error: false,
                    data: user,
                    message: 'user has been found!',
                    token: token
                })

            }
        }
     })
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});


/* POST todo. */
router.post('/signup', function(req, res, next) {
  const {
    username,
    password,
    active,
    roleName
  } = req.body;
  Promise.all([
      model.User.create({
          username: username,
          password: password,
          active: active
      }),
      model.Role.create({
          roleName: roleName
      })
  ]).then(function (results) {
      var user = results[0];
      var role = results[1];
      user.setUserData(role);
  })
  model.User.create({
    username: username,
    password: password,
    active: active
  }).then(user => function () {
    var userCheckin = model.UserCheckin.create({loginIp:'127.0.0.1'});
    user.posetUserCheckin(userCheckin);
    return res.status(201).json({
    error: false,
    data: user,
    message: 'New user has been created.'
  });})
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});

module.exports = router;



var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/relation').User;
var UserCheckin = require('../models/relation').UserCheckin;
var UserAddress = require('../models/relation').UserAddress;
var Role = require('../models/relation').Role;

router.get('/', function(req, res, next) {
    User.findOne()
        .then(function (users) {
                users.getAddress();
                res.json({
                    error: false,
                    data: users
                });
            }
        )
      .catch(error => res.json({
        error: true,
        data: [],
        error: error
      }));
});

router.post('/login', function(req, res, next) {
    const name = req.body.username;
    const password = req.body.password;
    console.log(model)
    User.findOne({
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
    active
  } = req.body;
  User.create({
    username: username,
    password: password,
    active: active
  }).then(function(user) {
      res.status(201).json({
          error: false,
          data: user,
          message: 'New user has been created.'
      })
  })
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));

});

module.exports = router;



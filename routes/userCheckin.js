var express = require('express');
var router = express.Router();
var model = require('../models/relation');

router.get('/', function(req, res, next) {
    model.UserCheckin.findAll({})
    .then(userCheckin => res.json({
        error: false,
        data: userCheckin
      }))
      .catch(error => res.json({
        error: true,
        data: [],
        error: error
      }));
});


/* POST role. */
router.post('/', function(req, res, next) {
  const {
    loginIp,
    userId,
  } = req.body;
  model.UserCheckin.create({
      loginIp: loginIp,
      userId: userId
  }).then(userCheckin => res.status(201).json({
    error: false,
    data: userCheckin,
    message: 'UserCheckin role has been created.'
  }))
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});

module.exports = router;



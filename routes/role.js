var express = require('express');
var router = express.Router();
var model = require('../models/relation');

router.get('/', function(req, res, next) {
    model.Role.findAll({})
    .then(roles => res.json({
        error: false,
        data: roles
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
    roleName,
  } = req.body;
  model.Role.create({
    roleName: roleName
  }).then(role => res.status(201).json({
    error: false,
    data: role,
    message: 'New role has been created.'
  }))
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});

module.exports = router;



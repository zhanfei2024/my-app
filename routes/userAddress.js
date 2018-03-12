var express = require('express');
var router = express.Router();
var UserAddress = require('../models/relation').UserAddress;

router.get('/', function(req, res, next) {
    UserAddress.findAll({})
    .then(userAddress =>
        res.json({
        error: false,
        data: userAddress
      }))
      .catch(error => res.json({
        error: true,
        data: [],
        error: error
      }));
});


/* POST userAddress. */
router.post('/', function(req, res, next) {
  const {
    userId,
    consignee,
    address,
    zipCode,
    tel
  } = req.body;
  UserAddress.create({
      userId: userId,
      consignee: consignee,
      address: address,
      zipCode: zipCode,
      tel: tel
  }).then(useraddress => res.status(201).json({
    error: false,
    data: useraddress,
    message: 'useraddress role has been created.'
  }))
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});

module.exports = router;



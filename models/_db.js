'use strict';

var Sequelize = require('sequelize');

exports.sequelize = function () {
    return new Sequelize('modelTest', 'zhanfei', 'emcoo',
        {host: 'localhost', port:5432, logging:console.log});
}

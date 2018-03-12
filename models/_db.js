'use strict';

var Sequelize = require('sequelize');

exports.sequelize = function () {
    return new Sequelize('test', 'zhanfei', 'emcoo',
        {   host: '127.0.0.1',
            dialect: 'postgres'
        });
}

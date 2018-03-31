const debug = require('debug')('APP:USERCOMPANY');

//model
const models = require('../models/relation');

// validate
const inputcheck = require('input-check');
const validateHelper = require('../helpers/ValidateHelper');

//library
const _ = require('lodash');

/*get list*/
async function index(req, res, next) {
    debug('Enter index method');
    const rules = {
        userId: 'integer|min:1|exists:User,id',
    };

    const input = validateHelper.pick(req.query, rules);
    try {
        await inputcheck.validate(input, rules, res.validatorMessage)
    }
}


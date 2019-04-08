'use strict';

const Joi = require('../../lib/joi');

//Using joi, determing schema for the user object in the body request
const ValidatorSchemaOfBody = Joi.object({
    firstname:Joi.string().required(),
    lastname:Joi.string().required(),
    location:Joi.string().required(),
    degree:Joi.string().required(),
    age:Joi.number().positive().required(),
    email:Joi.string().email().required()
});

module.exports = {
    ValidatorSchemaOfBody
};
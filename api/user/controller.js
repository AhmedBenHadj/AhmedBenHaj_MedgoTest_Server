const Joi = require('../../lib/joi');
const users = require('../../models/user');
const schema = require('./schema').ValidatorSchemaOfBody;

/**
 * Check the body of the request and add the user to the database
 *
 * @param {Object,Object} req,res - request and the result
 */
async function addUser(req,res){
    req.body = Joi.attempt(req.body,schema);
    if(req.body){
        await users.insertOne(req.body);
        res.status(200).send('Successfull request !');
    }
    res.status(405).send('An error has occured:!');
}

module.exports = {
    addUser,
};

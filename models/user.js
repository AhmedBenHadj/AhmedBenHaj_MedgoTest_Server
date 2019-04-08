const Joi = require('../lib/joi');
const dateLib = require('../lib/date');
const mongoose = require('mongoose');

//The collection name in the DATABASE
const COLLECTION_NAME = 'users' ;


//The mongooseSchema
const userSchema =  mongoose.Schema({
    created_at:Date,
    firstname:String,
    lastname:String,
    age:Number,
    degree:String,
    location:String
});


//The Joi User Schema
const joiUserSchema = Joi.object({
        _id:Joi.objectId(),
        created_at: Joi.date().default(() => dateLib.getDate(), 'time of creation'),
        firstname:Joi.string(),
        lastname:Joi.string(),
        location:Joi.string().required(),
        degree:Joi.string().required(),
        age:Joi.number().positive().required(),
        email:Joi.string().email().required()
});

/**
 * validate schema of a user
 *
 * @param {Object} user to be validate
 *
 * @returns {Object} response
 */
function _validateSchema(user) {
    return Joi.attempt(user,joiUserSchema);
}

/**
 * get the collection from the database
 *
 * @returns {Object} response
 */
function collection(){
    return mongoose.model(COLLECTION_NAME,userSchema) ;
}

/**
 * Validate user Schema and add that object to the database
 *
 * @param {Object} user - data about the inserted user
 *
 * @returns {Object} the inserted word
 */
async function insertOne(user){
    const user_validate = _validateSchema(user);
    if(user_validate){
        const user_returned = await collection().insertMany(user_validate);
        return user_returned ;
    }
    return null;
}

module.exports = {
    insertOne
};
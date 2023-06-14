
const { url } = require('inspector');
const { Schema, model } = require('mongoose')

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    title: {
        type: String
    },

    location: {
        type: String
    },

    biography: {
        type: String
    },

    image: {
        type: String
    }    

});



module.exports = model( 'User', UserSchema)


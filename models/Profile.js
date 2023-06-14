
const { Schema, model } = require('mongoose')

const ProfileSchema = Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    roles: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Role',
        required: true
    },

    tools: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Tool',
        required: true
    },

    members: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Member'
    },


});



module.exports = model( 'Profile', ProfileSchema)



const { Schema, model } = require('mongoose')

const TeamSchema = Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    leader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

    knowledges: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Knowledge',
        required: true
    },

    language: {
        type: Schema.Types.Array ,
        required: true
    },

    members: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Member',
        required: true
    }
});



module.exports = model( 'Team', TeamSchema)


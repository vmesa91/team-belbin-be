
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
        ref: 'Member',
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
        type: [ String ],
        required: true
    },

    members: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Member',
        required: true
    }
});


TeamSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object;
 })

module.exports = model( 'Team', TeamSchema)


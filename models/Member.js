
const { Schema, model } = require('mongoose')

const MemberSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    profiles: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Profile',
        required: true
    },

    expertise: {
        type: [ Schema.Types.Map ],
        of: new Schema({
            tool: {
                type: Schema.Types.ObjectId,
                ref: 'Tool'
            },
            score: Number
        }),
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

    Team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }

});

MemberSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object;
 })

module.exports = model( 'Member', MemberSchema)


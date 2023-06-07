
const { Schema, model } = require('mongoose')

const MemberSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    profiles: {
        type: [ Schema.Types.ObjectId ] ,
        ref: 'Profile',
        required: true
    },

    expertise: [{
        tool: {
          type: Schema.Types.ObjectId,
          ref: 'Tool'
        },
        score: {
          type: Number,
          default: 0
        }
      }],

    colleagues: [{
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        score: {
          type: Number,
          default: 0
        }
      }],

    knowledges: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Knowledge',
        required: true
    },

    language: {
        type: [ String ],
        required: true
    },

    belbinRol: {
        type: [ String ],
        required: true
    },

    team: {
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


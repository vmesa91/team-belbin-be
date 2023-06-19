
const { Schema, model } = require('mongoose')

const MemberSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    profile: {
        type: Schema.Types.ObjectId ,
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
        type: Schema.Types.Array ,
        required: true
    },

    belbinRol: {
        type: [ String ],
        required: true
    },

    teams: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Team'
    }

});


module.exports = model( 'Member', MemberSchema)



const { Schema, model } = require('mongoose')

const KnowledgeSchema = Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        required: true
    }

});

KnowledgeSchema.method('toJSON', function() {
   const { __v, _id, ...object } = this.toObject()
   object.id = _id
   return object;
})

module.exports = model('Knowledge', KnowledgeSchema)



const { Schema, model } = require('mongoose')

const KnowledgeSchema = Schema({

    name: {
        type: String,
        required: true
    },

    activation: {
        type: Boolean,
        required: true
    }

});



module.exports = model('Knowledge', KnowledgeSchema)



const { Schema, model } = require('mongoose')

const ToolSchema = Schema({

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

ToolSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object;
 })

module.exports = model( 'Tool', ToolSchema)


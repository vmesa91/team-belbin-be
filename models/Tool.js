
const { Schema, model } = require('mongoose')

const ToolSchema = Schema({

    name: {
        type: String,
        required: true
    },

    activation: {
        type: Boolean,
        required: true
    }

});


module.exports = model( 'Tool', ToolSchema)


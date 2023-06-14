
const { Schema, model } = require('mongoose')

const RoleSchema = Schema({

    name: {
        type: String,
        required: true
    },

    activation: {
        type: Boolean,
        required: true
    }

});



module.exports = model( 'Role', RoleSchema)



const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Connect Succesful')


    } catch (error) {
        throw new Error('Error al inicializar la base de datos')
    }
}

module.exports = {
    dbConnection
}
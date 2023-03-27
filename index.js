
const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./database/config')
const cors = require('cors')

// Create Express server
const app = express()

// Database
dbConnection()

// CORS
app.use(cors())

// Public Directory
app.use( express.static( 'public' ))

// Body Read & Parser
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/role', require('./routes/role'))
app.use('/api/tool', require('./routes/tool'))
app.use('/api/knowledge', require('./routes/knowledge'))
app.use('/api/user', require('./routes/user'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/member', require('./routes/member'))
app.use('/api/team', require('./routes/team'))

// Listen requests
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`)
})
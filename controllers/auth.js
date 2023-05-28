const { response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

const loginUser =  async( req, res = response ) => { 
    
    const { email , password } = req.body
    
    try {

        let user = await User.findOne( { email: email } )

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El user o contraseña son incorrectos'
            })
        }
        
        // Confirmar password
        const validPassword = bcrypt.compareSync( password, user.password )

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generate token
        const token = await generateJWT( user.id , user.name )

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            token,
            msg: 'Login Correcto'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
           
        })
    }

   
}

const createUser = async( req, res = response) => { 
    
    const { name, surname, email , password } = req.body
    
    try {
        
        let user = await User.findOne( { email: email } )

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }
        
        user = new User( req.body )

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync ( password, salt )

        await user.save()
         // Generate token
        const token = await generateJWT( user.id , user.name )
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            token,
            msg: 'Usuario creado correctamente'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
           
        })
    }
   
}

const refreshToken = async( req, res = response ) => { 

    const uid = req.uid
    const name = req.name

    // Generate new token 
    const newToken = await generateJWT( uid , name )
   
    res.json({
        ok: true,
        uid: uid,
        name: name,
        token: newToken,
        msg: 'Renovar Token'
    })
}


module.exports = {
    createUser,
    loginUser,
    refreshToken
}
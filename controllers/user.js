const { response } = require('express')

const User = require('../models/User')


// Read User
const readUsers = async( req, res = response) => { 

    const { page, limit } = req.query

    const startIndex = (page - 1) * limit
    
    let users = await User.find().skip(startIndex).limit(limit)
    
    res.json({
        ok: true,
        users,
        msg: 'Los usuarios fueron leídos correctamente'
    })
   
}

// Read unique User
const readUserId = async( req, res = response ) => {

    const userId = req.params.id

    try {
        let user = await User.findById( userId )

        if (!user) {
            res.status(404).json({
                ok: false,
                msg: 'El usuario no existe por ese Id'
            })
        }

        res.json({
            ok: true,
            user,
            msg: 'El usuario fue leído correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

// Update User
const updateUser = async( req, res = response ) => {

    const userId = req.params.id

    try {
        let user = await User.findById( userId )

        if (!user) {
            res.status(404).json({
                ok: false,
                msg: 'El usuario no existe por ese Id'
            })
        }

        const newDataUser = {
            ...req.body
        }

        const updateUser = await User.findByIdAndUpdate( userId, newDataUser, { new: true } )

        res.json({
            ok: true,
            updateUser,
            msg: 'El usuario fue actualizado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

// Delete User
const deleteUser = async( req, res = response ) => {

    const userId = req.params.id

    try {
        let user = await User.findById( userId )

        if (!user) {
            res.status(404).json({
                ok: false,
                msg: 'El usuario no existe por ese Id'
            })
        }

        const updateUser = await User.findByIdAndDelete( userId )

        res.json({
            ok: true,
            updateUser,
            msg: 'El usuario fue eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}



module.exports = {
    readUsers,
    readUserId,
    updateUser,
    deleteUser,
}
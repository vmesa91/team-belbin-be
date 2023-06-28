const { response } = require('express')

const Profile = require('../models/Profile')
const Role = require('../models/Role')
const Team = require('../models/Team')


// Create Role
const createRole = async( req, res = response ) => {

    const { name  } = req.body

    try {

        let role = await Role.findOne( { name: name } )

        if (role) {
            return res.status(400).json({
                ok: false,
                msg: 'El rol ya existe'
            })
        }

        role = new Role( req.body )

        await role.save()

        res.status(201).json({
            ok: true,
            uid: role.id,
            name: role.name,
            activation: role.active,
            msg: 'Role creado correctamente'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
           
        })
    }
}

// Read Role
const readRoles = async( req, res = response ) => {


    const { page, limit } = req.query

    const startIndex = (page - 1) * limit

    let roles = await Role.find().skip(startIndex).limit(limit)


    res.json({
        ok: true,
        roles,
        msg: 'El rol fue leído correctamente'
    })

}

// Read unique Role
const readRoleId = async( req, res = response ) => {

    const roleId = req.params.id

    try {
        let role = await Role.findById( roleId )

        if (!role) {
            res.status(404).json({
                ok: false,
                msg: 'El Rol no existe por ese Id'
            })
        }

        res.json({
            ok: true,
            role,
            msg: 'El rol fue leído correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}


// Update Role
const updateRole = async( req, res = response ) => {

    const roleId = req.params.id

    try {
        let role = await Role.findById( roleId )

        if (!role) {
            res.status(404).json({
                ok: false,
                msg: 'El Rol no existe por ese Id'
            })
        }

        const newDataRol = {
            ...req.body
        }

        const updateRol = await Role.findByIdAndUpdate( roleId, newDataRol, { new: true } )

        res.json({
            ok: true,
            updateRol,
            msg: 'El Rol ha sido actualizado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

// Delete Role
const deleteRole = async( req, res = response ) => {

    const roleId = req.params.id

    try {
        let role = await Role.findById( roleId )

        if (!role) {
            res.status(404).json({
                ok: false,
                msg: 'El Rol no existe por ese Id'
            })
        }

        // Delete in Profiles 
        await Profile.updateMany(
           { roles : roleId },
           { $pull: { roles: roleId } }
        )
        
        // Delete in Team
        await Team.updateMany(
            { roles : roleId },
            { $pull: { roles: roleId } }
         )

        await Role.findByIdAndDelete( roleId )

        res.json({
            ok: true,
            msg: 'El Rol ha sido eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

module.exports = {
    createRole,
    readRoles,
    readRoleId,
    updateRole,
    deleteRole
}
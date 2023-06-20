const { response } = require('express')

const Member = require('../models/Member')
const Profile = require('../models/Profile')
const Team = require('../models/Team')


// Create Member
const createMember = async( req, res = response ) => {

    const { user , profile } = req.body
    console.log(req.body)

    try {

        let member = await Member.findOne( { user: user } )

        if (member) {
            return res.status(400).json({
                ok: false,
                msg: 'El miembro ya existe'
            })
        }   

        const resp = await Member.create(req.body)

        // RESPUESTA POPULADA
        member = await Member.findById( resp._id )
            .populate('profile')
            .populate('user')
            .populate('knowledges','name active')
            .populate('expertise')
            .populate('expertise.tool')
            .populate('colleagues')
            .populate('colleagues.user')


        // Actualizar los miembros dentro de un perfil
        Member.findOne(resp).populate('profile')
       .then( (member) => { 
            Profile.findByIdAndUpdate(
                profile,
                { $push: { members: member._id } },
                { new: true }
            ).then( updatedProfile => {
                console.log('OK', updatedProfile)
                } ).catch( error => {
                console.log('ERROR', error)
                })     
         })

        res.status(201).json({
            ok: true,
            member,
            msg: 'Miembro creado correctamente'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
           
        })
    }
}

 // Read Member
const readMember = async( req, res = response ) => {

    const { page, limit } = req.query

    const startIndex = (page - 1) * limit

    let member = await Member.find().skip(startIndex).limit(limit)
    .populate('profile')
    .populate('user')
    .populate('knowledges','name active')
    .populate('expertise')
    .populate('expertise.tool')
    .populate('colleagues')
    .populate('colleagues.user')
    .populate('team')

    res.json({
        ok: true,
        member,
        msg: 'El miembro fue leído correctamente'
    })

}

// Read unique Member
const readMemberId = async( req, res = response ) => {

    const memberId = req.params.id

    try {
        let member = await Member.findById( memberId )

        if (!member) {
            res.status(404).json({
                ok: false,
                msg: 'El Miembro no existe por ese Id'
            })
        }

        res.json({
            ok: true,
            member,
            msg: 'El miembro fue leído correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}


// Update Member
const updateMember = async( req, res = response ) => {

    const memberId = req.params.id

    try {
        let member = await Member.findById( memberId )

        if (!member) {
            res.status(404).json({
                ok: false,
                msg: 'El Miembro no existe por ese Id'
            })
        }

        const newDataMember = {
            ...req.body
        }

        const updateMember = await Member.findByIdAndUpdate( memberId, newDataMember, { new: true } )

        res.json({
            ok: true,
            updateMember,
            msg: 'El Miembro ha sido actualizado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

// Delete Member
const deleteMember = async( req, res = response ) => {

    const memberId = req.params.id

    try {
        let member = await Member.findById( memberId )

        if (!member) {
            res.status(404).json({
                ok: false,
                msg: 'El Miembro no existe por ese Id'
            })
        }

        // Delete in Profiles  
        await Profile.updateOne(
            { members : memberId },
            { $pull: { members: memberId } }
            ).then( (res) => console.log('Profile', res))

        // Delete in Teams 
        await Team.updateMany(
            { members : memberId },
            { $pull: { members: memberId } }
            ).then( (res) => console.log('Team' , res))

        await Member.findByIdAndDelete( memberId )

        res.json({
            ok: true,
            msg: 'El Miembro ha sido eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador',
            error: error
        })
    }

}

module.exports = {
    createMember,
    readMember,
    readMemberId,
    updateMember,
    deleteMember
    
}
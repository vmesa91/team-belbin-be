const { response } = require('express')

const Member = require('../models/Member')
const Profile = require('../models/Profile')
const Team = require('../models/Team')


// Create Member
const createMember = async( req, res = response ) => {

    const { user , profiles } = req.body
    console.log(profiles)

    try {

        let member = await Member.findOne( { user: user } )

        if (member) {
            return res.status(400).json({
                ok: false,
                msg: 'El miembro ya existe'
            })
        }   

        member = await Member.create(req.body)

        // Actualizar los miembros dentro de un perfil
        Member.findOne(member).populate('profiles')
       .then( (member) => { 
            profiles.map( (profileId) => {
               Profile.findByIdAndUpdate(
                    profileId,
                    { $push: { members: member._id } },
                    { new: true }
                ).then( updatedProfile => {
                    console.log('OK', updatedProfile)
                 } ).catch( error => {
                    console.log('ERROR', error)
                 })
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
    .populate('user', ' name surname email title image biography location ')
    .populate('profiles')
    .populate('knowledges','name active')
    .populate('expertise','tool score')
    .populate('expertise.tool')
    .populate('colleagues','user score')
    .populate('colleagues.user')

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
        await Profile.updateMany(
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
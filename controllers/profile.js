const { response } = require('express')

const Profile = require('../models/Profile')
const Member = require('../models/Member')


// Create Profile
const createProfile = async( req, res = response ) => {

    const { name  } = req.body

    try {

        let profile = await Profile.findOne( { name: name } )

        if (profile) {
            return res.status(400).json({
                ok: false,
                msg: 'El profile ya existe'
            })
        }

        const resp = await Profile.create(req.body)

        // RESPUESTA POPULADA
        profile = await Profile.findById( resp._id )
            .populate('roles','name active')
            .populate('tools','name active')
            .populate('members','user profile belbinRol expertise colleagues knowledges language')
            .populate('members.user')
            .populate('members.profile')
            .populate('members.belbinRol')
            .populate('members.expertise')
            .populate('members.expertise.tool')
            .populate('members.colleagues')
            .populate('members.colleagues.user')
            .populate('members.knowledges')
            .populate('members.language')

        res.status(201).json({
            ok: true,
            profile,
            msg: 'Profile creado correctamente'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador : ' + error
           
        })
    }
}

// Read Profile
const readProfiles = async( req, res = response ) => {

    let profiles = await Profile.find()
    .populate('roles','name active')
    .populate('tools','name active')
    .populate('members', 'user')
    .populate({
        path: 'members',
        populate: {
            path: 'user'
        }
       
    })


    res.json({
        ok: true,
        profiles,
        msg: 'Los perfiles fueron leídos correctamente'
    })

}

// Read unique Profile
const readProfileId = async( req, res = response ) => {

    const profileId = req.params.id

    try {
        let profile = await Profile.findById( profileId )

        if (!profile) {
            res.status(404).json({
                ok: false,
                msg: 'El Profile no existe por ese Id'
            })
        }

        res.json({
            ok: true,
            profile,
            msg: 'El profile fue leído correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

// Read Tools to Profile by Id
const readToolsByProfileId = async(req, res = response) => {

    const profileId = req.params.id

    try {
        let profile = await Profile.findById( profileId ).select("id tools name description")

        if (!profile) {
            res.status(404).json({
                ok: false,
                msg: 'El Profile no existe por ese Id'
            })
        }

        res.json({
            ok: true,
            profile,
            msg: 'El profile fue leído correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
    
}

const manageProfiles = async( req, res = response ) => {
    
    const profileId = req.params.id

    try {

        let members = await Member.find({ profile: profileId }).select('user')
        let profile = await Profile.findById( profileId ).select('id name roles tools')

        if (!profile) {
            res.status(404).json({
                ok: false,
                msg: 'El Profile no existe por ese Id'
            })
        }

        res.json({
            ok: true,
            profile,
            members,
            msg: 'El profile fue leído correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}


// Update Profile
const updateProfile = async( req, res = response ) => {

    const profileId = req.params.id

    try {
        let profile = await Profile.findById( profileId )

        if (!profile) {
            res.status(404).json({
                ok: false,
                msg: 'El Profile no existe por ese Id'
            })
        }

        const newDataProfile = {
            ...req.body
        }

        let updateProfile = await Profile.findByIdAndUpdate( profileId, newDataProfile, { new: true } )

        // RESPUESTA POPULADA
        updateProfile = await Profile.findById( profileId )
            .populate('roles','name active')
            .populate('tools','name active')
            .populate('members','user profile belbinRol expertise colleagues knowledges language')
            .populate('members.user')
            .populate('members.profile')
            .populate('members.belbinRol')
            .populate('members.expertise')
            .populate('members.expertise.tool')
            .populate('members.colleagues')
            .populate('members.colleagues.user')
            .populate('members.knowledges')
            .populate('members.language')

        res.json({
            ok: true,
            updateProfile,
            msg: 'El Profile ha sido actualizado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

// Delete Profile
const deleteProfile = async( req, res = response ) => {

    const profileId = req.params.id

    try {
        let profile = await Profile.findById( profileId )

        if (!profile) {
            res.status(404).json({
                ok: false,
                msg: 'El Profile no existe por ese Id'
            })
        }

        // Delete in Members 
        await Member.updateOne(
            { profile : profileId },
            { $pull: { profile: profileId } }
            )

        await Profile.findByIdAndDelete( profileId )

        res.json({
            ok: true,
            msg: 'El Profile ha sido eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador' , error 
        })
    }

}


module.exports = {
    createProfile,
    readProfiles,
    readProfileId,
    readToolsByProfileId,
    manageProfiles,
    updateProfile,
    deleteProfile
    
}
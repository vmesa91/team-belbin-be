const { response } = require('express')

const Team = require('../models/Team')
const Member = require('../models/Member')


// Create Team
const createTeam = async( req, res = response ) => {

    const { name , members } = req.body

    try {

        let team = await Team.findOne( { name: name } )

        if (team) {
            return res.status(400).json({
                ok: false,
                msg: 'El equipo ya existe'
            })
        }

        team = new Team( req.body )
        // Actualizar los equipos dentro de un miembro
        Team.findOne(team).populate('members')
        .then( (team) => { 
                members.map( (memberId) => {
                Member.findByIdAndUpdate(
                        memberId,
                        { $push: { team: teams._id } },
                        { new: true }
                    ).then( updatedTeam => {
                        console.log('OK', updatedTeam)
                    } ).catch( error => {
                        console.log('ERROR', error)
                    })
                })
            })
         

        await team.save()

        res.status(201).json({
            ok: true,
            team,
            msg: 'Equipo creado correctamente'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
           
        })
    }
}

// Read Team
const readTeams = async( req, res = response ) => {

    const { page, limit } = req.query

    const startIndex = (page - 1) * limit

    let teams = await Team.find().skip(startIndex).limit(limit)
    .populate('leader')
    .populate('roles','name active')
    .populate('tools','name active')
    .populate('knowledges','name active')
    .populate('members')


    res.json({
        ok: true,
        teams,
        msg: 'El equipo fue leído correctamente'
    })

}

// Read unique Team
const readTeamId = async( req, res = response ) => {

    const teamId = req.params.id

    try {
        let team = await Team.findById( teamId )

        if (!team) {
            res.status(404).json({
                ok: false,
                msg: 'El equipo no existe por ese Id'
            })
        }

        res.json({
            ok: true,
            team,
            msg: 'El equipo fue leído correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}


// Update Team
const updateTeam = async( req, res = response ) => {

    const teamId = req.params.id

    try {
        let team = await Team.findById( teamId )

        if (!team) {
            res.status(404).json({
                ok: false,
                msg: 'El equipo no existe por ese Id'
            })
        }

        const newDataTeam = {
            ...req.body
        }

        const updateTeam = await Team.findByIdAndUpdate( teamId, newDataTeam, { new: true } )

        res.json({
            ok: true,
            updateTeam,
            msg: 'El equipo ha sido actualizado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

// Delete Team
const deleteTeam = async( req, res = response ) => {

    const teamId = req.params.id

    try {
        let team = await Team.findById( teamId )

        if (!team) {
            res.status(404).json({
                ok: false,
                msg: 'El equipo no existe por ese Id'
            })
        }


        // Delete in Member
        await Member.updateMany(
            { teams : teamId },
            { $pull: { teams: teamId } }
            )

        await Team.findByIdAndDelete( teamId )

        res.json({
            ok: true,
            msg: 'El equipo ha sido eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

module.exports = {
    createTeam,
    readTeams,
    readTeamId,
    updateTeam,
    deleteTeam
    
}
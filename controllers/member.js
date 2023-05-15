const { response } = require('express')

const Member = require('../models/Member')


// Create Member
const createMember = async( req, res = response ) => {

    const { user , expertise } = req.body


    console.log(req.body)

    try {

        let member = await Member.findOne( { user: user } )

        if (member) {
            return res.status(400).json({
                ok: false,
                msg: 'El miembro ya existe'
            })
        }   

       
       
        member = await  Member.create(req.body)
/*         member.expertise.map( exp =>  {
            member.expertise.set( 'tool' , exp.tool )
            member.expertise.set( 'score' , exp.score )
        }) */

        console.log(member)
            

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
    .populate('profiles','name')
    .populate('knowledges','name active')
    .populate('expertise','tool score')

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
            msg: 'El profile fue leído correctamente'
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


        // Delete in Teams 
        await Team.updateMany(
            { members : memberId },
            { $pull: { members: memberId } }
            )

        await Member.findByIdAndDelete( memberId )

        res.json({
            ok: true,
            msg: 'El Miembro ha sido eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
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
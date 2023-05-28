const { response } = require('express')

const Knowledge = require('../models/Knowledge')


// Create Knowledge
const createKnowledge = async( req, res = response ) => {

    const { name  } = req.body

    try {

        let knowledge = await Knowledge.findOne( { name: name } )

        if (knowledge) {
            return res.status(400).json({
                ok: false,
                msg: 'El conocimiento/ámbito ya existe'
            })
        }

        knowledge = new Knowledge( req.body )

        await knowledge.save()

        res.status(201).json({
            ok: true,
            uid: knowledge.id,
            name: knowledge.name,
            activation: knowledge.activation,
            msg: 'Conocimiento/ámbito creado correctamente'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
           
        })
    }
}

// Read Knowledge
const readKnowledges = async( req, res = response ) => {

    const { page, limit } = req.query

    const startIndex = (page - 1) * limit

    let knowledges = await Knowledge.find().skip(startIndex).limit(limit)

    res.json({
        ok: true,
        knowledges,
        msg: 'El conocimiento/ámbito fue leído correctamente'
    })

}

// Read unique Knowledge
const readKnowledgeId = async( req, res = response ) => {

    const knowledgeId = req.params.id

    try {
        let knowledge = await Knowledge.findById( knowledgeId )

        if (!knowledgeId) {
            res.status(404).json({
                ok: false,
                msg: 'El Conocimiento/ámbito no existe por ese Id'
            })
        }

        res.json({
            ok: true,
            knowledge,
            msg: 'El Conocimiento/ámbito fue leído correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}


// Update Knowledge
const updateKnowledge = async( req, res = response ) => {

    const knowledgeId = req.params.id

    try {
        let knowledge = await Knowledge.findById( knowledgeId )

        if (!knowledge) {
            res.status(404).json({
                ok: false,
                msg: 'El Conocimiento/ámbito no existe por ese Id'
            })
        }

        const newDataKnowledge = {
            ...req.body
        }

        const updateKnowledge = await Knowledge.findByIdAndUpdate( knowledgeId, newDataKnowledge, { new: true } )

        res.json({
            ok: true,
            updateKnowledge,
            msg: 'El Conocimiento/ámbito ha sido actualizado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

// Delete Knowledge
const deleteKnowledge = async( req, res = response ) => {

    const knowledgeId = req.params.id

    try {
        let knowledge = await Knowledge.findById( knowledgeId )

        if (!knowledge) {
            res.status(404).json({
                ok: false,
                msg: 'El Conocimiento/ámbito no existe por ese Id'
            })
        }

        // Delete in Members
        await Member.updateMany(
            { knowledges : knowledgeId },
            { $pull: { knowledges: knowledgeId } }
            )
            
        // Delete in Team
        await Team.updateMany(
            { knowledges : knowledgeId },
            { $pull: { knowledges: knowledgeId } }
        )
    
        await Knowledge.findByIdAndDelete( knowledgeId )

        res.json({
            ok: true,
            msg: 'El Conocimiento/ámbito ha sido eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

module.exports = {
    createKnowledge,
    readKnowledges,
    readKnowledgeId,
    updateKnowledge,
    deleteKnowledge
}
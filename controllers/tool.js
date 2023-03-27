const { response } = require('express')

const Tool = require('../models/Tool')


// Create Tool
const createTool = async( req, res = response ) => {

    const { name } = req.body

    try {

        let tool = await Tool.findOne( { name: name } )

        if (tool) {
            return res.status(400).json({
                ok: false,
                msg: 'La herramienta/tecnología ya existe'
            })
        }

        tool = new Tool( req.body )

        await tool.save()

        res.status(201).json({
            ok: true,
            uid: tool.id,
            name: tool.name,
            description: tool.description,
            active: tool.active,
            msg: 'Herramienta/Tecnología creada correctamente'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
           
        })
    }
}

// Read Tools
// ?page=0&limit=6
const readTools = async( req, res = response ) => {

    const { page, limit } = req.query

    const startIndex = (page - 1) * limit

    let tools = await Tool.find().skip(startIndex).limit(limit)

    res.json({
        ok: true,
        tools,
        msg: 'La herramienta/tecnología fue leída correctamente'
    })

}

// Read unique Tool
const readToolId = async( req, res = response ) => {

    const toolId = req.params.id

    try {
        let tool = await Tool.findById( toolId )

        if (!tool) {
            res.status(404).json({
                ok: false,
                msg: 'La herramienta/tecnología no existe por ese Id'
            })
        }

        res.json({
            ok: true,
            tool,
            msg: 'La herramienta/tecnología fue leída correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}


// Update Tool
const updateTool = async( req, res = response ) => {

    const toolId = req.params.id

    try {
        let tool = await Tool.findById( toolId )

        if (!tool) {
            res.status(404).json({
                ok: false,
                msg: 'La herramienta/tecnología no existe por ese Id'
            })
        }

        const newDataTool = {
            ...req.body
        }

        const updateTool = await Tool.findByIdAndUpdate( toolId, newDataTool, { new: true } )

        res.json({
            ok: true,
            updateTool,
            msg: 'La herramienta/tecnología ha sido actualizada correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}

// Delete Tool
const deleteTool= async( req, res = response ) => {

    const toolId = req.params.id

    try {
        let tool = await Tool.findById( toolId )

        if (!tool) {
            res.status(404).json({
                ok: false,
                msg: 'La herramienta/tecnología no existe por ese Id'
            })
        }

        // Delete in Profiles 
        await Profile.updateMany(
            { tools : toolId },
            { $pull: { tools: toolId } }
         )
         
         // Delete in Team
         await Team.updateMany(
             { tools : toolId },
             { $pull: { tools: toolId } }
          )


        await Tool.findByIdAndDelete( toolId )

        res.json({
            ok: true,
            msg: 'La herramienta/tecnología ha sido eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

module.exports = {
    createTool,
    readTools,
    readToolId,
    updateTool,
    deleteTool
}
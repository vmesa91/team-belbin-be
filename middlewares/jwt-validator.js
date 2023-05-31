
const { response } = require('express')
const jwt = require('jsonwebtoken')


const jwtValidator = ( req, res = response, next ) => {

    // x-token Headers
    const token = req.header( 'x-token' )
    
    // Validation
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe token en la petición'
        })
    }

    try {

        const payload = jwt.verify( 
            token,
            process.env.SECRET_JWT_SEED
         )

        req.uid = payload.uid
        req.name = payload.name


        
    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'    
        })
        
    }

    next()

}


module.exports = {
    jwtValidator
}
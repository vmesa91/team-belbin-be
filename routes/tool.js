
/* Tool Routes: TOOL 
   host + /api/tool
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { fieldValidator } = require('../middlewares/field-validator')
const { createTool , readTools , readToolId , updateTool , deleteTool } = require('../controllers/tool')
const { jwtValidator } = require('../middlewares/jwt-validator')

const router = Router()


// All request need to validate token
router.use( jwtValidator )


// Create Tool
router.post(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('description', 'La descripción es obligatorio').not().isEmpty(),
      check('active', 'El campo active tiene que ser un booleano').isBoolean(),
      fieldValidator
   ],
   // 3. Controller
   createTool)



// Read Tools
router.get(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   // 3. Controller
   readTools)

// Read Tool by Id
router.get(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   readToolId)



// Update Tool
router.put(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   updateTool)



// Delete Tool
router.delete(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   deleteTool)


module.exports = router;
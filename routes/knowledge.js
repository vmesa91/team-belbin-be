
/* Knowledge Routes: KNOWLEDGE
   host + /api/knowledge
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { fieldValidator } = require('../middlewares/field-validator')
const {  createKnowledge, readKnowledges, readKnowledgeId, updateKnowledge, deleteKnowledge } = require('../controllers/knowledge')
const { jwtValidator } = require('../middlewares/jwt-validator')

const router = Router()


// All request need to validate token
router.use( jwtValidator )


// Create Knowledge
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
   createKnowledge)



// Read Knowledges
router.get(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   // 3. Controller
   readKnowledges)

// Read Knowledge by Id
router.get(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   readKnowledgeId)



// Update Knowledge
router.put(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   updateKnowledge)



// Delete Knowledge
router.delete(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   deleteKnowledge)


module.exports = router;

/* Member Routes: MEMBER 
   host + /api/member
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { createMember , readMember, readMemberId, updateMember, deleteMember } = require('../controllers/member')
const { fieldValidator } = require('../middlewares/field-validator')
const { jwtValidator } = require('../middlewares/jwt-validator')

const router = Router()


// All request need to validate token
router.use( jwtValidator )

// Create Member
router.post(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   [
      check('user', 'El nombre es obligatorio').not().isEmpty(),
      check('profiles', 'Los perfiles son obligatorios').not().isEmpty(),
      check('expertise', 'La expertise es obligatoria').not().isEmpty(),
      check('colleagues', 'La red de amigos es obligatoria').not().isEmpty(),
      check('knowledges', 'Los conocimientos/ámbitos son obligatorios').not().isEmpty(),
      check('belbinRol', 'Los roles de Belbin son obligatorios').not().isEmpty(),
      check('language', 'El lenguaje es obligatorio').not().isEmpty(),
      fieldValidator
   ],
   // 3. Controller
   createMember)

// Read Member 
router.get(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   // 3. Controller
   readMember)

// Read Member by Id
router.get(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   readMemberId)



// Update Member
router.put(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   updateMember)



// Delete Member
router.delete(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   deleteMember)


module.exports = router;
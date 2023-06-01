
/* Team Routes: TEAM 
   host + /api/team
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { createTeam, readTeams, readTeamId, updateTeam, deleteTeam } = require('../controllers/team')
const { fieldValidator } = require('../middlewares/field-validator')
const { jwtValidator } = require('../middlewares/jwt-validator')

const router = Router()


// All request need to validate token
router.use( jwtValidator )

// Create Team
router.post(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('leader', 'El líder es obligatorio').not().isEmpty(),
      check('roles', 'Los roles son obligatorio').not().isEmpty(),
      check('tools', 'Las herramientas/tecnologías son obligatorias').not().isEmpty(),
      check('knowledges', 'Los conocimientos/ámbitos son obligatorias').not().isEmpty(),
      check('language', 'El lenguaje es obligatorio').not().isEmpty(),
      check('members', 'Los miembros son obligatorias').not().isEmpty(),
      fieldValidator
   ],
   // 3. Controller
   createTeam)

// Read Teams
router.get(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   // 3. Controller
   readTeams)

// Read Team by Id
router.get(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   readTeamId)



// Update Team
router.put(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   updateTeam)



// Delete Team
router.delete(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   deleteTeam)


module.exports = router;

/* Role Routes: ROLE 
   host + /api/role
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { fieldValidator } = require('../middlewares/field-validator')
const { createRole , readRoles , readRoleId , updateRole , deleteRole } = require('../controllers/role')
const { jwtValidator } = require('../middlewares/jwt-validator')

const router = Router()


// All request need to validate token
router.use( jwtValidator )


// Create Role
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
   createRole)



// Read Roles
router.get(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   // 3. Controller
   readRoles)

// Read Role by Id
router.get(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   readRoleId)



// Update Role
router.put(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   updateRole)



// Delete Role
router.delete(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   deleteRole)


module.exports = router;
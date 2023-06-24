
/* Profile Routes: PROFILE 
   host + /api/profile
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { createProfile , readProfiles, readProfileId, updateProfile, deleteProfile, getProfilesPopular } = require('../controllers/profile')
const { fieldValidator } = require('../middlewares/field-validator')
const { jwtValidator } = require('../middlewares/jwt-validator')

const router = Router()


// All request need to validate token
router.use( jwtValidator )

// Create Profile
router.post(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('description', 'La descripción es obligatorio').not().isEmpty(),
      check('roles', 'Los roles son obligatorio').not().isEmpty(),
      check('tools', 'Las herramientas/tecnologías son obligatorias').not().isEmpty(),
      fieldValidator
   ],
   // 3. Controller
   createProfile)

// Read Profiles
router.get(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   // 3. Controller
   readProfiles)

// Read Profile by Id
router.get(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   readProfileId)

// Update Profile
router.put(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   updateProfile)


// Delete Profile
router.delete(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   deleteProfile)


module.exports = router;
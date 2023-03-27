
/* User Routes: AUTH 
   host + /api/auth
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { createUser , loginUser , refreshToken } = require('../controllers/auth')
const { fieldValidator } = require('../middlewares/field-validator')
const { jwtValidator } = require('../middlewares/jwt-validator')

const router = Router()

// Login
router.post(
   // 1. Endpoint Path
   '/',
   [
      // 2. Middlewares
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'El password debe de ser de 6 caracteres').isLength( { min: 6 } ),
      fieldValidator
   ],
   // 3. Controller
   loginUser)

// Registro
router.post(
   // 1. Endpoint Path
   '/register',
   [
      // 2. Middlewares
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('surname', 'El apellido es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'El password debe de ser de 6 caracteres').isLength( { min: 6 } ),
      fieldValidator
   ],
   // 3. Controller
   createUser)

// Refrescar Token
router.get(
   // 1. Endpoint Path
   '/refreshToken',
   // 2. Middlewares
    jwtValidator, 
   // 3. Controller
    refreshToken)


module.exports = router;
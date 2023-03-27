
/* User Routes: USER 
   host + /api/user
*/

const { Router } = require('express')

const { readUsers , readUserId, updateUser, deleteUser } = require('../controllers/user')
const { jwtValidator } = require('../middlewares/jwt-validator')

const router = Router()


// All request need to validate token
router.use( jwtValidator )

// Read Users
router.get(
   // 1. Endpoint Path
   '/',
   // 2. Middlewares
   // 3. Controller
   readUsers)

// Read User by Id
router.get(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   readUserId)



// Update User
router.put(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   updateUser)



// Delete User
router.delete(
   // 1. Endpoint Path
   '/:id',
   // 2. Middlewares
   // 3. Controller
   deleteUser)


module.exports = router;
//userRoutes linked to userCOntrollers
import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js'

router.post('/', registerUser) //controller function as callback
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.post('/auth', authUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)

export default router
//called in server

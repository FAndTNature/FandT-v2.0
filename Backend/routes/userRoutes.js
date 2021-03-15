const express = require('express')
const { getUsers, getUserProfile, registerUsers, updateUserProfile } = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', registerUsers)
router.post('/login', getUsers)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

module.exports = router
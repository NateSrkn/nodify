const router = require('express').Router()
const verify = require('./validateToken')
const { createUser, getAllUsers, getUserById, deleteUser, updateUser } = require('../controllers/users')

router.post('/', createUser)

router.get('/', getAllUsers)
router.get('/:userId', getUserById)

router.patch('/:userId', verify ,updateUser)

router.delete('/:userId', verify, deleteUser)

module.exports = router
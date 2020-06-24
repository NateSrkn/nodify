import express from 'express'
import { verifyToken } from '../middleware/validate'
import { createUser, getAllUsers, getUserById, deleteUser, updateUser } from '../controllers/users'
import { verifyAdmin } from '../middleware/admin'

let router = express.Router()

router.post('/', createUser)

router.get('/', [verifyToken, verifyAdmin], getAllUsers)
router.get('/:userId', [verifyToken, verifyAdmin], getUserById)

router.patch('/:userId', verifyToken ,updateUser)

router.delete('/:userId', verifyToken, deleteUser)

export {router as usersRoute}
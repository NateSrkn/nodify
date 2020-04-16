import express from 'express'
import { verifyToken } from '../helpers/helper'
import { createUser, getAllUsers, getUserById, deleteUser, updateUser } from '../controllers/users'
let router = express.Router()
router.post('/', createUser)

router.get('/', verifyToken, getAllUsers)
router.get('/:userId', verifyToken, getUserById)

router.patch('/:userId', verifyToken ,updateUser)

router.delete('/:userId', verifyToken, deleteUser)

export {router as usersRoute}
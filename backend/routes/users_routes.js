import express from "express"
import {addUser, getUser, getUserId, editUser, logout, deleteUsers} from "../controllers/users_controller.js"
import {Login} from "../controllers/auth.js";
import { refreshToken } from "../controllers/refresh_token.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/users/', verifyToken, getUser);
router.get('/getallusers/', getUser);
router.get('/users/:id', getUserId);
router.post('/addusers', addUser);
router.delete('/logout', logout);
router.patch('/users/:id', editUser);
router.delete('/users/:id', deleteUsers);
router.post('/login', Login)
router.get('/token', refreshToken)

export default router;
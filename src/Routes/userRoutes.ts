import express from "express";
import UserController from '../Controllers/User.controller';
import { auth } from '../Middlewares/index';

const router = express.Router();

router
    .get('/', auth.validateToken, UserController.getUsers)
    .get('/:userid', [auth.validateToken, auth.validateIsAdmin], UserController.getUserById)
    .post('/', [auth.validateToken, auth.validateIsAdmin, auth.checkDuplicateUser, auth.checkExistingRoles], UserController.createUser)
    .patch('/:userid', [auth.validateToken, auth.validateIsAdmin], UserController.uptadeUserById)
    .delete('/:userid', [auth.validateToken, auth.validateIsAdmin], UserController.deleteUserById)

module.exports = router;
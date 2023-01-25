import express from "express";
import UserController from '../Controllers/User.controller';

const router = express.Router();

router
    .get('/', UserController.getUsers)
    .get('/:userid', UserController.getUserById)
    .post('/', UserController.createUser)
    .patch('/:userid', UserController.uptadeUserById)
    .delete('/:userid', UserController.deleteUserById)

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



router.post('/signup', authController.signup);
router.delete('/delete/:userId', authController.deleteUser);
router.put('/update/:userId', authController.updateUser);
router.post('/login', authController.login);
router.get('/users/:userId', authController.getUserData);

module.exports = router;

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');



router.post('/create', taskController.create);
router.delete('/delete', taskController.deleteTask);
router.put('/update', taskController.edit);
router.get('/display', taskController.display);

module.exports = router;

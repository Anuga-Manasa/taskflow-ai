const express= require('express');
const router= express.Router();

const {createTask, getTasks, updateTaskStatus}= require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/:boardId/tasks',authMiddleware,createTask);
router.get('/:boardId/tasks',authMiddleware, getTasks);
router.patch('/tasks/:taskId/status',authMiddleware,updateTaskStatus);

module.exports = router;
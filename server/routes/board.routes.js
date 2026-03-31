const express= require('express');
const router = express.Router();

const {createBoard, getBoards} = require('../controllers/board.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/:workspaceId/boards',authMiddleware, createBoard); 
router.get('/:workspaceId/boards',authMiddleware,getBoards); //requires id to send in params

module.exports = router;
const express= require('express');
const router= express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {createWorkspace,getWorkspaces}=require('../controllers/workspace.controller');
router.post('/',authMiddleware, createWorkspace);
router.get('/', authMiddleware, getWorkspaces);

module.exports = router; 
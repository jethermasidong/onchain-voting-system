import express from 'express';
import {login, insert} from '../controllers/voterController.js';
import {auth, adminOnly} from '../config/authMiddleware.js';
const router = express.Router();

router.post('/login', login);
router.post('/insert-voter', auth, adminOnly, insert)

export default router;
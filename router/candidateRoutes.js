import express from 'express';
import {insert} from '../controllers/candidateController.js';
import {auth, adminOnly} from '../config/authMiddleware.js';
const router = express.Router();

router.post('/insert-candidate', auth, adminOnly, insert);

export default router;
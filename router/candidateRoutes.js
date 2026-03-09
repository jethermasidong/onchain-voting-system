import express from 'express';
import {insert} from '../controllers/candidateController';
import {auth, adminOnly} from '../config/authMiddleware';
const router = express.Router();

router.post('/insert-candidate', auth, adminOnly, insert);

export default router;